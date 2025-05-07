const mongoose = require('mongoose');

const mongoConnection = "mongodb+srv://admin:PasswordAdmin@myapp.jakwepm.mongodb.net/ProyectoIntegrador";

mongoose.connection.on('connecting', () => {
    console.log('Conectando...');
    console.log(mongoose.connection.readyState); // Estado 2: Connecting
});

mongoose.connection.on('connected', () => {
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState); // Estado 1: Connected
});

mongoose.connect(mongoConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;
