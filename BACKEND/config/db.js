const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:PasswordAdmin@myapp.jakwepm.mongodb.net/ProyectoIntegrador");
        console.log('¡Conectado exitosamente!');
    } catch (err) {
        console.error('Error de conexión a MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
