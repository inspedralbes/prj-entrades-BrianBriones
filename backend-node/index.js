const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// NUEVO: Importar HTTP y Socket.io
const http = require('http');
const { Server } = require('socket.io');

// Cargar variables de entorno (si usas fichero .env)
dotenv.config();

const app = express();

// NUEVO: Crear servidor HTTP a partir de la app Express
const server = http.createServer(app);

// NUEVO: Configurar el servidor de Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // El puerto de Nuxt
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }
});

const PORT = process.env.PORT || 4000;

// Puedes cambiarlo en tu archivo .env o usar http://localhost si esa es tu configuración de Nginx/Apache.
const LARAVEL_URL = process.env.LARAVEL_URL || 'http://127.0.0.1:8000';

// Configuración para procesar JSON en peticiones POST
app.use(express.json());

// Configuración de CORS permitiendo que Nuxt acceda
app.use(cors({
  origin: 'http://localhost:3000', // El puerto donde suele arrancar Nuxt
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ======== SOCKET.IO EVENTOS ========

// NUEVO: Escuchar conexiones de clientes WebSocket
io.on('connection', (socket) => {
  console.log('cliente conectado (Socket ID:', socket.id, ')');

  socket.on('disconnect', () => {
    console.log('cliente desconectado (Socket ID:', socket.id, ')');
  });
});

// ======== ENDPOINTS BFF ========

// Obtener todos los partidos
app.get('/api/matches', async (req, res) => {
  try {
    // 1. Fetch partidos reales próximos desde TheSportsDB
    let sportsRes = await axios.get('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4335');
    let upcomingEvents = sportsRes.data.events || [];
    
    // Si la API gratuita no nos da suficientes partidos próximos, usamos partidos pasados reales
    // y los parseamos para que parezcan futuros para poder testear la app
    if (upcomingEvents.length < 10) {
      const pastRes = await axios.get('https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=4335');
      if (pastRes.data && pastRes.data.events) {
        upcomingEvents = [...upcomingEvents, ...pastRes.data.events].slice(0, 15);
      }
    }
    
    const matches = upcomingEvents.map((event, index) => {
       // Si el partido está acabado, le asignamos una fecha inventada futura para poder testear
       let date = `${event.dateEvent}T${event.strTimeLocal || event.strTime}`;
       if (event.strStatus === 'Match Finished') {
         const futureDate = new Date();
         futureDate.setDate(futureDate.getDate() + index + 1); // un día después
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

// Obtener detalle de un partido
app.get('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Fetch partido desde TheSportsDB
    const sportsRes = await axios.get(`https://www.thesportsdb.com/api/v1/json/123/lookupevent.php?id=${id}`);
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

    // 2. Traer los tickets desde Laravel usando el idEvent
    try {
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

// Reservar tickets
app.post('/api/tickets/reserve', async (req, res) => {
  try {
    // Reenviamos el body directamente a Laravel
    const response = await axios.post(`${LARAVEL_URL}/api/tickets/reserve`, req.body);
    
    // NUEVO: Si la petición se completa y Laravel devuelve OK,
    // emitimos el evento 'ticketsUpdated' a todos los clientes conectados.
    io.emit('ticketsUpdated', {
      matchId: req.body.match_id
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

// ======== HELPER DE ERRORES ========
function handleAxiosError(error, res) {
  if (error.response) {
    // Laravel contestó con un código de error (Ej: 400, 404, 500, o 422 de validación)
    return res.status(error.response.status).json(error.response.data);
  } else if (error.request) {
    // La petición se envió pero Laravel no respondió (Caído o error de red)
    console.error('El backend Laravel devolvió un error (sin respuesta):', error.message);
    return res.status(503).json({ 
      error: 'Service Unavailable', 
      message: 'No se pudo contactar con el backend Laravel.' 
    });
  } else {
    // Un error armando la petición en Node
    console.error('Error BFF interno:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// NUEVO: Usar "server.listen" en lugar de "app.listen" para iniciar express + socket.io
server.listen(PORT, () => {
  console.log(` BFF Node.js-Express con Socket.io escuchando en http://localhost:${PORT}`);
  console.log(` Usando backend Laravel en: ${LARAVEL_URL}`);
});