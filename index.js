const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

require('./db'); // Importa la conexión a la base de datos

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Importa y utiliza las rutas de tareas
const tareaRoutes = require('./routes/tareaRoutes');
app.use('/api', tareaRoutes);

// Escucha del servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});