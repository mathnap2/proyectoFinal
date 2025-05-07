const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Correo inválido']
    },
    password: { type: String, required: true, minlength: 6 },
    joinedAt: { type: Date, default: Date.now },
    sexo: { type: String, enum: ['H', 'M'], required: true }
});

module.exports = mongoose.model('User', userSchema);
