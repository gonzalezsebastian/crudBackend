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
        const { nombre, descripcion, estado, prioridad } = req.body;

        const nuevaTarea = new Tarea({
            nombre,
            descripcion,
            estado,
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
    const campos = req.body;
    const camposPermitidos = ['nombre', 'descripcion', 'estado', 'prioridad'];

    // Verificar si se proporcionaron campos para actualizar
    if (!campos || Object.keys(campos).length === 0) {
        return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar' });
    }

    // Verificar si los campos proporcionados son válidos
    const camposInvalidos = Object.keys(campos).filter(campo => !camposPermitidos.includes(campo));
    if (camposInvalidos.length > 0) {
        return res.status(400).json({ message: `Los siguientes campos no son válidos: ${camposInvalidos.join(', ')}` });
    }

    try {
        // Construir un objeto con los campos válidos para actualizar
        const camposActualizados = {};
        camposPermitidos.forEach(campo => {
            if (campos.hasOwnProperty(campo)) {
                camposActualizados[campo] = campos[campo];
            }
        });

        // Actualizar la tarea con los campos proporcionados
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, camposActualizados, { new: true });

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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};