require('dotenv').config(); // <--- Importa variables desde .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/checkout');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Conexión a MongoDB usando .env
mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;
db.on('connecting', () => console.log('Conectando a MongoDB...'));
db.on('connected', () => console.log('¡Conectado exitosamente a MongoDB!'));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../FRONTEND/views')));
app.use(express.static('FRONTEND'));
app.use('/controllers', express.static('../FRONTEND/controllers'));
app.use('/views', express.static('../FRONTEND/views'));
app.use('/assets', express.static(path.resolve(__dirname, '../FRONTEND/assets')));

// Rutas API
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Arrancar servidor
app.listen(port, () => {
    console.log("Aplicación corriendo en puerto " + port);
});


//MONGO_URI=mongodb+srv://admin:Mncb0219@myapp.cc6eeqb.mongodb.net/proyecto_final; //Mathias
//MONGO_URI=mongodb+srv://admin:123@myapp.wvoylgk.mongodb.net/ProyectoIntegrador; //Angel
//MONGO_URI=mongodb+srv://admin:PasswordAdmin@myapp.jakwepm.mongodb.net/ProyectoIntegrador