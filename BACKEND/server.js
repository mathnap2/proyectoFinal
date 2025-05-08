const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');


const paymentRoutes = require("./routes/checkout");

const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Conexión a la BD

//let mongoConnection = "mongodb+srv://admin:Mncb0219@myapp.cc6eeqb.mongodb.net/proyecto_final"; //Mathias
//let mongoConnection = "mongodb+srv://admin:123@myapp.wvoylgk.mongodb.net/ProyectoIntegrador"; //Angel
let mongoConnection = "mongodb+srv://admin:PasswordAdmin@myapp.jakwepm.mongodb.net/ProyectoIntegrador"; //Reilly

let db = mongoose.connection;
db.on('connecting', () => console.log('Conectando...'));
db.on('connected', () => console.log('¡Conectado exitosamente!'));
mongoose.connect(mongoConnection);



app.get('/home.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/home.html")));
app.get('/navbar.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/navbar.html")));
app.get('/products.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/products.html")));
app.get('/login.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/login.html")));
app.get('/footer.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/footer.html")));
app.get('/profile.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/profile.html")));
app.get('/cart.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/cart.html")));
app.get('/product.html', (req, res) => res.sendFile(path.resolve(__dirname, "../FRONTEND/views/product.html")));


// Usar las rutas
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use("/api/payment", paymentRoutes);



//Express
app.use(express.static('FRONTEND'));
app.use('/controllers', express.static('../FRONTEND/controllers'));
app.use('/views', express.static('../FRONTEND/views'));
app.use('/assets', express.static(path.resolve(__dirname, '../FRONTEND/assets')));



//Listen
app.listen(port, () => {
    console.log("Aplicación corriendo en puerto " + port);
});
