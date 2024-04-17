const Tarea = require('../models/tareaModel');

// Función para obtener todas las tareas
exports.obtenerTodasLasTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para crear una nueva tarea
exports.crearTarea = async (req, res) => {
    try {
        const { nombre, descripcion, completada, prioridad } = req.body;

        const nuevaTarea = new Tarea({
            nombre,
            descripcion,
            completada,
            prioridad
        });

        const tareaCreada = await nuevaTarea.save();
        res.status(201).json({ message: 'Tarea creada correctamente', tarea: tareaCreada });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para obtener una tarea por su ID
exports.obtenerTareaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await Tarea.findById(id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para actualizar una tarea por su ID con uno o más campos
exports.actualizarTarea = async (req, res) => {
    const campos = req.body; // Tomar los campos directamente del cuerpo de la solicitud
    const camposPermitidos = ['nombre', 'descripcion', 'completada', 'prioridad'];

    // Verificar si se proporcionaron campos para actualizar
    if (!campos || Object.keys(campos).length === 0) {
        return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar' });
    }

    // Verificar si los campos proporcionados son válidos
    for (const campo in campos) {
        if (!camposPermitidos.includes(campo)) {
            return res.status(400).json({ message: `El campo '${campo}' no es válido` });
        }
    }

    try {
        // Actualizar la tarea con los campos proporcionados
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, campos, { new: true });

        // Verificar si se encontró la tarea
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para eliminar una tarea por su ID
exports.eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(204).json({ message: 'Tarea eliminada correctamente' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};