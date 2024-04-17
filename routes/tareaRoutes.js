const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

// Rutas para las tareas
router.get('/tareas', tareaController.obtenerTodasLasTareas);
router.post('/add-tareas', tareaController.crearTarea);
// router.get('/tareas/:id', tareaController.obtenerTareaPorId);
router.put('/update-tareas/:id', tareaController.actualizarTarea);
router.delete('/tareas/:id', tareaController.eliminarTarea);

module.exports = router;