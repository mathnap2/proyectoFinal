const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send({ error: 'Contraseña incorrecta' });

        res.status(200).send({ mensaje: 'Inicio de sesión exitoso', user });
    } catch (err) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
};
