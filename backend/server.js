require('dotenv').config();  // Carga las variables de entorno desde .env
const express = require("express");  // Importamos Express para crear el servidor
const cors = require("cors");  // Importamos CORS para permitir peticiones desde el frontend

const app = express();  // Inicializamos la aplicación Express
const PORT = process.env.PORT || 3000;  // Definimos el puerto, usando .env o 3000 por defecto

app.use(cors());  // Habilitamos CORS para que el frontend pueda hacer peticiones
app.use(express.json());  // Middleware para permitir recibir datos en formato JSON

// Endpoint principal de prueba
app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend de Jesús Losada con Express!");
});

// Endpoint que devuelve un mensaje en JSON
app.get("/api/mensaje", (req, res) => {
  res.json({ mensaje: "¡Hola desde el backend en Express!" });
});

// Endpoint que recibe datos desde el frontend (POST)
app.post("/api/enviar", (req, res) => {
  const { nombre } = req.body;  // Capturamos el nombre enviado por el frontend
  res.json({ mensaje: `¡Hola, ${nombre}! Tu mensaje ha sido recibido.` });
});

// Endpoint con un parámetro dinámico en la URL
app.get("/api/usuario/:id", (req, res) => {
  const userId = req.params.id;  // Capturamos el ID de la URL
  res.json({ mensaje: `Información del usuario con ID: ${userId}` });
});

//  Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
