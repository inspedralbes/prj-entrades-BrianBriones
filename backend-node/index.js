const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// Cargar variables de entorno (si usas fichero .env)
dotenv.config();

const app = express();
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

// ======== ENDPOINTS BFF ========

// Obtener todos los partidos
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get(`${LARAVEL_URL}/api/matches`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

// Obtener detalle de un partido
app.get('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${LARAVEL_URL}/api/matches/${id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleAxiosError(error, res);
  }
});

// Reservar tickets
app.post('/api/tickets/reserve', async (req, res) => {
  try {
    // Reenviamos el body directamente a Laravel
    const response = await axios.post(`${LARAVEL_URL}/api/tickets/reserve`, req.body);
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

app.listen(PORT, () => {
  console.log(` BFF Node.js-Express escuchando en http://localhost:${PORT}`);
  console.log(` Usando backend Laravel en: ${LARAVEL_URL}`);
});