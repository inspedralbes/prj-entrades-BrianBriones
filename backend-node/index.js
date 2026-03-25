const express = require('express');
const app = express();
const port = 4000; // Usamos el 4000 para no chocar con Nuxt (3000) ni Laravel (8000)

app.get('/', (req, res) => {
  res.send('🚀 ¡El microservicio de Node.js funciona correctamente!');
});

app.listen(port, () => {
  console.log(`✅ Servidor node-api escuchando en http://localhost:${port}`);
});