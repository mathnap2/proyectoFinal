const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'El correo no tiene un formato válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);
