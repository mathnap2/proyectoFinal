const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');


const app = express();
const PORT = 3000;

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://admin:Mncb0219@myapp.cc6eeqb.mongodb.net/proyecto_final', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error('Error al conectar MongoDB Atlas:', err));

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
