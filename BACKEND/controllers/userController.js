const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, sexo } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, joinedAt: new Date(), sexo });
        const savedUser = await newUser.save();
        res.status(201).send({ mensaje: 'Usuario creado exitosamente', savedUser });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send({ error: 'El correo ya está registrado' });
        } else {
            res.status(400).send({ error: 'Error al crear usuario', detalles: err });
        }
    }
};

exports.getUsers = (req, res) => {
    let name = req.query.name || '';
    User.find({ name: { $regex: name, $options: 'i' } })
        .then(docs => res.send(docs))
        .catch(err => res.status(400).send(err));
};

exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).send({ error: 'Usuario no encontrado' });

        res.send({ mensaje: 'Usuario actualizado correctamente', updatedUser });
    } catch (err) {
        res.status(400).send({ error: 'Error al actualizar el usuario', detalles: err });
    }
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(doc => res.send({ mensaje: "Usuario eliminado", doc }))
        .catch(err => res.status(400).send(err));
};
