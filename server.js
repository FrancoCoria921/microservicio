// server.js

const express = require('express');
const app = express();
const cors = require('cors');

// Configuración del puerto: utiliza la variable de entorno PORT (necesario para el hosting) o 3000 por defecto.
const port = process.env.PORT || 3000;

// Habilitar CORS para permitir solicitudes desde FreeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 })); 

// ----------------------------------------------------------------------
// RUTA DE INICIO
// ----------------------------------------------------------------------

// Ruta simple para verificar que el servidor esté activo.
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running. Use /api/:date_string');
});

// ----------------------------------------------------------------------
// RUTA PRINCIPAL DE LA API: Maneja /api/ o /api/:date
// ----------------------------------------------------------------------

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;
  let date;

  // 1. Manejar caso sin parámetro (fecha actual)
  if (!dateString) {
    date = new Date();
  } else {
    // 2. Determinar si es un número entero (UNIX timestamp)
    // Se usa RegEx para asegurar que el string sea solo dígitos, lo que indica un timestamp UNIX.
    if (/^\d+$/.test(dateString)) {
      // Si es un número, lo parseamos a entero para new Date()
      date = new Date(parseInt(dateString));
    } else {
      // Si es una cadena, lo parseamos como fecha legible (UTC)
      date = new Date(dateString);
    }
  }

  // 3. Verificar si la fecha es inválida
  // Si new Date() no pudo parsear el string, .getTime() devolverá NaN.
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // 4. Devolver la respuesta exitosa con ambos formatos
  res.json({
    unix: date.getTime(), // Marca de tiempo UNIX en milisegundos
    utc: date.toUTCString() // Fecha en formato UTC legible
  });
});

// ----------------------------------------------------------------------
// INICIO DEL SERVIDOR
// ----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}...`);
});
