const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// HTTP y Socket.io
const http = require('http');
const { Server } = require('socket.io');

// Cargar variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend Nuxt
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }
});

const PORT = process.env.PORT || 4000;
const LARAVEL_URL = process.env.LARAVEL_URL || 'http://127.0.0.1:8000';

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ==========================================
// 🧱 1. ESTRUCTURAS DE DATOS EN MEMORIA
// ==========================================

// --- SISTEMA DE COLA ---
const activeUsers = new Set(); // Usuarios comprando ahora (Socket UUID)
const queue = [];              // Usuarios esperando
const MAX_USERS = 5;           // Máximo de usuarios concurrentes en compra

// --- CONTADOR DE DEMANDA ---
// Formato: { matchId: Set(socketId, socketId...) }
const viewers = {};            

// --- GESTIÓN DE ASIENTOS EN TIEMPO REAL ---
// Formato: { matchId: { seatId: socketId } }
const lockedSeats = {};
// Formato: { matchId: Set('lat-14', ...) }
const occupiedSeats = {};

// --- DATOS DE RESPALDO (MOCKS) ---
// Usar IDs puramente numéricos para no romper la base de datos de Laravel (integer matches.id)
const MOCK_MATCHES = [
  { idEvent: '999991', strHomeTeam: 'FC Barcelona', strAwayTeam: 'Real Madrid', strVenue: 'Spotify Camp Nou', dateEvent: '2026-05-10', strTime: '21:00:00', strLeague: 'Spanish La Liga', idLeague: '4335' },
  { idEvent: '999992', strHomeTeam: 'Atletico Madrid', strAwayTeam: 'Sevilla FC', strVenue: 'Civitas Metropolitano', dateEvent: '2026-05-12', strTime: '20:00:00', strLeague: 'Spanish La Liga', idLeague: '4335' },
  { idEvent: '999993', strHomeTeam: 'Valencia CF', strAwayTeam: 'Villarreal CF', strVenue: 'Mestalla', dateEvent: '2026-05-15', strTime: '19:00:00', strLeague: 'Spanish La Liga', idLeague: '4335' },
  { idEvent: '999994', strHomeTeam: 'Athletic Club', strAwayTeam: 'Real Sociedad', strVenue: 'San Mames', dateEvent: '2026-05-18', strTime: '22:00:00', strLeague: 'Spanish La Liga', idLeague: '4335' }
];

// ==========================================
// 🔥 2. EVENTOS SOCKET.IO
// ==========================================
io.on('connection', (socket) => {
  console.log(` Cliente conectado: ${socket.id}`);

  // --- SISTEMA DE COLA ---
  socket.on('joinQueue', () => {
    if (activeUsers.size < MAX_USERS) {
      activeUsers.add(socket.id);
      socket.emit('queueApproved');
      console.log(`🎟️ Usuario ${socket.id} entró directo a compra. Activos: ${activeUsers.size}`);
    } else {
      if (!queue.includes(socket.id) && !activeUsers.has(socket.id)) {
        queue.push(socket.id);
      }
      socket.emit('queuePosition', { position: queue.indexOf(socket.id) + 1 });
      console.log(` Usuario ${socket.id} en cola. Posición: ${queue.indexOf(socket.id) + 1}`);
    }
  });

  socket.on('leaveQueue', () => {
    removeUserFromQueueAndActive(socket.id);
  });

  // --- CONTADOR DE DEMANDA Y SALAS ---
  socket.on('viewMatch', (matchId) => {
    socket.join(`match_${matchId}`); // Unirse a la sala del partido

    if (!viewers[matchId]) {
      viewers[matchId] = new Set();
    }
    viewers[matchId].add(socket.id);
    
    socket.currentMatchId = matchId; 

    io.to(`match_${matchId}`).emit('viewersUpdate', {
      matchId,
      count: viewers[matchId].size
    });
    console.log(` Viewer añadido a partido ${matchId}. Total: ${viewers[matchId].size}`);
  });

  // --- SEAT LOCKING EN TIEMPO REAL ---
  socket.on('getLocks', (matchId) => {
     if (lockedSeats[matchId]) {
       socket.emit('initialLocks', lockedSeats[matchId]);
     }
     if (occupiedSeats[matchId]) {
       socket.emit('initialOccupied', Array.from(occupiedSeats[matchId]));
     }
  });

  socket.on('seatPurchased', ({ matchId, seats }) => {
    if (!occupiedSeats[matchId]) occupiedSeats[matchId] = new Set();
    
    seats.forEach(seatId => {
       occupiedSeats[matchId].add(seatId);
       // Lo quitamos de reservados porque ya se pagó
       if (lockedSeats[matchId] && lockedSeats[matchId][seatId]) {
          delete lockedSeats[matchId][seatId];
       }
    });

    // Anunciamos la ocupación definitiva
    io.to(`match_${matchId}`).emit('seatsOccupied', seats);
  });

  socket.on('requestHold', ({ matchId, seats }) => {
    if (!lockedSeats[matchId]) lockedSeats[matchId] = {};
    if (!occupiedSeats[matchId]) occupiedSeats[matchId] = new Set();
    
    // Check race conditions: if any seat is already locked by someone else OR occupied
    let canHold = true;
    for (const seatId of seats) {
      if ((lockedSeats[matchId][seatId] && lockedSeats[matchId][seatId] !== socket.id) || occupiedSeats[matchId].has(seatId)) {
        canHold = false;
        break;
      }
    }

    if (canHold) {
       seats.forEach(seatId => {
         lockedSeats[matchId][seatId] = socket.id;
         // Avisamos a los demás en el mapa (Naranja: Reservat per un altre)
         io.to(`match_${matchId}`).emit('seatLocked', { seatId, socketId: socket.id });
       });
       socket.emit('holdSuccess');
    } else {
       socket.emit('holdFailed');
    }
  });

  // Antiguo lockSeat uno por uno ya no se usa, lo dejamos para retrocompatibilidad
  socket.on('lockSeat', ({ matchId, seatId }) => {
    if (!lockedSeats[matchId]) lockedSeats[matchId] = {};
    
    // Si ya está bloqueado por otro, avisar
    if (lockedSeats[matchId][seatId] && lockedSeats[matchId][seatId] !== socket.id) {
       socket.emit('seatLockFailed', { seatId });
       return;
    }
    
    lockedSeats[matchId][seatId] = socket.id;
    io.to(`match_${matchId}`).emit('seatLocked', { seatId, socketId: socket.id });
  });

  socket.on('unlockSeat', ({ matchId, seatId }) => {
    if (lockedSeats[matchId] && lockedSeats[matchId][seatId] === socket.id) {
      delete lockedSeats[matchId][seatId];
      io.to(`match_${matchId}`).emit('seatUnlocked', { seatId });
    }
  });

  socket.on('leaveMatch', (matchId) => {
    socket.leave(`match_${matchId}`);
    removeViewerFromMatch(socket.id, matchId);
    releaseUserSeats(socket.id, matchId);
  });

  socket.on('disconnect', () => {
    console.log(` Cliente desconectado: ${socket.id}`);
    removeUserFromQueueAndActive(socket.id);
    if (socket.currentMatchId) {
      removeViewerFromMatch(socket.id, socket.currentMatchId);
      releaseUserSeats(socket.id, socket.currentMatchId);
    }
  });
});

function releaseUserSeats(socketId, matchId) {
  if (!lockedSeats[matchId]) return;
  for (const seatId in lockedSeats[matchId]) {
    if (lockedSeats[matchId][seatId] === socketId) {
      delete lockedSeats[matchId][seatId];
      io.to(`match_${matchId}`).emit('seatUnlocked', { seatId });
    }
  }
}

function removeUserFromQueueAndActive(socketId) {
  if (activeUsers.has(socketId)) {
    activeUsers.delete(socketId);
    if (queue.length > 0) {
      const nextUser = queue.shift();
      activeUsers.add(nextUser);
      io.to(nextUser).emit('queueApproved');
      
      queue.forEach((id, index) => {
        io.to(id).emit('queuePosition', { position: index + 1 });
      });
    }
  } else {
    const index = queue.indexOf(socketId);
    if (index !== -1) {
      queue.splice(index, 1);
      queue.forEach((id, idx) => {
        io.to(id).emit('queuePosition', { position: idx + 1 });
      });
    }
  }
}

function removeViewerFromMatch(socketId, matchId) {
  if (viewers[matchId] && viewers[matchId].has(socketId)) {
    viewers[matchId].delete(socketId);
    io.to(`match_${matchId}`).emit('viewersUpdate', {
      matchId,
      count: viewers[matchId].size
    });
  }
}

// ==========================================
// 🌐 ENDPOINTS BFF
// ==========================================

app.get('/api/matches', async (req, res) => {
  try {
    let sportsRes = await axios.get('https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4335');
    let upcomingEvents = sportsRes.data.events || [];
    
    if (upcomingEvents.length < 10) {
      const pastRes = await axios.get('https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=4335');
      if (pastRes.data && pastRes.data.events) {
        upcomingEvents = [...upcomingEvents, ...pastRes.data.events];
      }
    }

    // Filtrar estrictamente para evitar partidos dummy como Liverpool vs Swansea
    upcomingEvents = upcomingEvents.filter(e => e.idLeague === '4335' || e.strLeague === 'Spanish La Liga');
    
    if (upcomingEvents.length === 0) {
      // Fallback a partidos españoles hardcodeados si la API falla o da solo datos dummy
      upcomingEvents = [...MOCK_MATCHES];
    }
    
    const matches = upcomingEvents.slice(0, 45).map((event, index) => {
       let date = `${event.dateEvent}T${event.strTimeLocal || event.strTime}`;
       if (event.strStatus === 'Match Finished' || date.includes('null')) {
         const futureDate = new Date();
         futureDate.setDate(futureDate.getDate() + index + 1);
         date = futureDate.toISOString();
       }

       return {
         id: event.idEvent,
         home_team: event.strHomeTeam,
         away_team: event.strAwayTeam,
         stadium: event.strVenue || 'Estadio por confirmar',
         date: date
       };
    });
    
    try {
      const laravelRes = await axios.get(`${LARAVEL_URL}/api/matches`);
      const laravelMatches = laravelRes.data.data ? laravelRes.data.data : laravelRes.data;
      
      if (Array.isArray(laravelMatches)) {
         // Filtrar los que son creados por admin (IDs altos o manuales)
         const customMatches = laravelMatches.filter(m => parseInt(m.id) >= 9000000).map(m => ({
            id: m.id.toString(),
            home_team: m.home_team,
            away_team: m.away_team,
            stadium: m.stadium || 'Estadi Personalitzat',
            date: m.date
         }));
         
         matches.unshift(...customMatches);
      }
    } catch(e) {
      console.error('Error obteniendo matches custom de Laravel:', e.message);
    }
    
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching external API:', error.message);
    res.status(500).json({ error: 'No se pudieron recuperar los partidos' });
  }
});

app.get('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    let event = null;
    let isCustom = false;
    let customData = null;
    
    if (parseInt(id) >= 9000000) {
       isCustom = true;
       try {
          const laravelRes = await axios.get(`${LARAVEL_URL}/api/matches/${id}`);
          customData = laravelRes.data.data || laravelRes.data;
       } catch(e) {
          console.error("Error al buscar partido custom en Laravel", e.message);
       }
    } else {
       const mockMatch = MOCK_MATCHES.find(m => m.idEvent === id);
       if (mockMatch) {
         event = mockMatch;
       } else {
         const sportsRes = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupevent.php?id=${id}`);
         event = sportsRes.data.events ? sportsRes.data.events[0] : null;
       }
    }
    
    if (!event && !isCustom) {
      return res.status(404).json({ message: 'Partido no encontrado en TheSportsDB ni en mock' });
    }
    
    if (isCustom && !customData) {
      return res.status(404).json({ message: 'Partido custom no encontrado en Laravel' });
    }

    const matchData = isCustom ? {
      id: customData.id.toString(),
      home_team: customData.home_team,
      away_team: customData.away_team,
      stadium: customData.stadium || 'Estadi Personalitzat',
      date: customData.date,
      tickets: []
    } : {
      id: event.idEvent,
      home_team: event.strHomeTeam,
      away_team: event.strAwayTeam,
      stadium: event.strVenue || 'Estadio por confirmar',
      date: `${event.dateEvent}T${event.strTimeLocal || event.strTime}`,
      tickets: []
    };

    try {
      // Laravel ahora calcula disponible usando Holds
      const ticketsRes = await axios.get(`${LARAVEL_URL}/api/tickets/match/${id}`);
      matchData.tickets = ticketsRes.data;
    } catch (e) {
      console.error('Error al recuperar tickets de Laravel:', e.message);
    }

    res.status(200).json(matchData);
  } catch (error) {
    console.error('Error BFF interno:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Proxy Hold a Laravel
app.post('/api/tickets/hold', async (req, res) => {
  try {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    if (req.headers.cookie) headers['Cookie'] = req.headers.cookie;

    const response = await axios.post(`${LARAVEL_URL}/api/tickets/hold`, req.body, { headers });
    
    // Emitimos tickets updated genérico al resto
    io.emit('ticketsUpdated', { message: 'Hold activado en backend' });

    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

// Proxy Reserve a Laravel
app.post('/api/tickets/reserve', async (req, res) => {
  try {
    const { match_id } = req.body;
    
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    if (req.headers.cookie) headers['Cookie'] = req.headers.cookie;

    const response = await axios.post(`${LARAVEL_URL}/api/tickets/reserve`, req.body, { headers });
    
    io.emit('ticketsUpdated', { matchId: match_id });

    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});


// Proxy GET Orders a Laravel
app.get('/api/orders', async (req, res) => {
  try {
    const headers = { 'Accept': 'application/json' };
    if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    if (req.headers.cookie) headers['Cookie'] = req.headers.cookie;

    const response = await axios.get(`${LARAVEL_URL}/api/orders`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

// Proxy Admin endpoints
app.post('/api/admin/matches', async (req, res) => {
  try {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    if (req.headers.cookie) headers['Cookie'] = req.headers.cookie;

    const response = await axios.post(`${LARAVEL_URL}/api/admin/matches`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const headers = { 'Accept': 'application/json' };
    if (req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    if (req.headers.cookie) headers['Cookie'] = req.headers.cookie;

    const response = await axios.get(`${LARAVEL_URL}/api/admin/stats`, { headers });
    
    // Unir estadísticas de Sockets en tiempo real con Laravel
    let totalHolds = 0;
    Object.values(lockedSeats).forEach(m => totalHolds += Object.keys(m).length);
    let totalRoomsUsers = 0;
    Object.values(viewers).forEach(set => totalRoomsUsers += set.size);
    
    const combinedData = {
       ...response.data,
       sockets_connected: io.engine.clientsCount,
       realtime_viewers: totalRoomsUsers,
       active_reserves_in_queue: totalHolds + queue.length,
       total_active_users: activeUsers.size
    };
    
    res.status(200).json(combinedData);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

// ======== HELPER DE ERRORES ========
function handleAxiosError(error, res) {
  if (error.response) {
    return res.status(error.response.status).json(error.response.data);
  } else if (error.request) {
    return res.status(503).json({ 
      error: 'Service Unavailable', 
      message: 'No se pudo contactar con el backend Laravel.' 
    });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

server.listen(PORT, () => {
  console.log(` BFF Node.js-Express con Socket.io escuchando en http://localhost:${PORT}`);
});
