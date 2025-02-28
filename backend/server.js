require('dotenv').config();  // Carga las variables de entorno desde .env
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');  // Importamos Pool para conectarnos a PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos PostgreSQL en AWS RDS
const pool = new Pool({
    user: 'postgres',  // Usuario de la base de datos
    host: 'disney.cnanbt27k03l.us-east-1.rds.amazonaws.com',  // Endpoint de tu RDS
    database: 'postgres',  // Nombre de la base de datos
    password: 'Ganadores2025',  // Contraseña de PostgreSQL
    port: 5432
});

// Verificar conexión a la base de datos
pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL en AWS RDS"))
    .catch(err => console.error("❌ Error de conexión:", err));

app.use(cors());
app.use(express.json());

// Endpoint de prueba para verificar la API
app.get('/', (req, res) => {
    res.send('API funcionando con PostgreSQL');
});

// Endpoint para obtener datos de la base de datos
app.get('/api/usuarios', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
