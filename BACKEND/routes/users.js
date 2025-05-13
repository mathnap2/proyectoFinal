const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Correo ya registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({
            message: 'Usuario registrado correctamente',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Obtener usuarios (opcional)
router.get('/', (req, res) => {
    let name = req.query.name || '';
    User.find({ name: { $regex: name, $options: 'i' } })
        .then(docs => res.send(docs))
        .catch(err => res.status(400).send(err));
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) return res.status(404).send({ error: 'Usuario no encontrado' });

        res.send({ mensaje: 'Usuario actualizado correctamente', updatedUser });
    } catch (err) {
        res.status(400).send({ error: 'Error al actualizar el usuario', detalles: err });
    }
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(doc => res.send({ mensaje: "Usuario eliminado", doc }))
        .catch(err => res.status(400).send(err));
});

module.exports = router;
