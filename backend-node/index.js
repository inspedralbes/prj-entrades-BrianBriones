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

  // --- CONTADOR DE DEMANDA ---
  socket.on('viewMatch', (matchId) => {
    if (!viewers[matchId]) {
      viewers[matchId] = new Set();
    }
    viewers[matchId].add(socket.id);
    
    socket.currentMatchId = matchId; 

    io.emit('viewersUpdate', {
      matchId,
      count: viewers[matchId].size
    });
    console.log(` Viewer añadido a partido ${matchId}. Total: ${viewers[matchId].size}`);
  });

  socket.on('leaveMatch', (matchId) => {
    removeViewerFromMatch(socket.id, matchId);
  });

  socket.on('disconnect', () => {
    console.log(` Cliente desconectado: ${socket.id}`);
    removeUserFromQueueAndActive(socket.id);
    if (socket.currentMatchId) {
      removeViewerFromMatch(socket.id, socket.currentMatchId);
    }
  });
});

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
    io.emit('viewersUpdate', {
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
        upcomingEvents = [...upcomingEvents, ...pastRes.data.events].slice(0, 15);
      }
    }
    
    const matches = upcomingEvents.map((event, index) => {
       let date = `${event.dateEvent}T${event.strTimeLocal || event.strTime}`;
       if (event.strStatus === 'Match Finished') {
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
    
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching external API:', error.message);
    res.status(500).json({ error: 'No se pudieron recuperar los partidos' });
  }
});

app.get('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sportsRes = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupevent.php?id=${id}`);
    const event = sportsRes.data.events ? sportsRes.data.events[0] : null;
    
    if (!event) {
      return res.status(404).json({ message: 'Partido no encontrado en TheSportsDB' });
    }

    const matchData = {
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
