const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            joinedAt: new Date()
        });

        const savedUser = await newUser.save();
        res.status(201).send({ mensaje: 'Usuario creado exitosamente', savedUser });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send({ error: 'El correo ya está registrado' });
        } else if (err.name === 'ValidationError') {
            const errores = {};
            for (let field in err.errors) {
                errores[field] = err.errors[field].message;
            }
            res.status(400).send({ error: 'Error de validación', detalles: errores });
        } else {
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
});

// Leer usuarios
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

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Contraseña incorrecta' });
        }

        res.status(200).send({ mensaje: 'Inicio de sesión exitoso', user });
    } catch (err) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
