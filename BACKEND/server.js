const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Conexión a la BD
let mongoConnection = "mongodb+srv://admin:Mncb0219@myapp.cc6eeqb.mongodb.net/proyecto_final";
let db = mongoose.connection;
db.on('connecting', () => console.log('Conectando...'));
db.on('connected', () => console.log('¡Conectado exitosamente!'));
mongoose.connect(mongoConnection);

// Usar las rutas
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

app.listen(port, () => {
    console.log("Aplicación corriendo en puerto " + port);
});
