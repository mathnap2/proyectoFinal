const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Conexión con la BD:
let mongoConnection = "mongodb+srv://admin:PasswordAdmin@myapp.jakwepm.mongodb.net/ProyectoIntegrador";
let db = mongoose.connection;
db.on('connecting', () => { 
    console.log('Conectando...');
    console.log(mongoose.connection.readyState); //State 2: Connecting
});
db.on('connected', () => {
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState); //State 1: Connected
});
mongoose.connect(mongoConnection);

// Esquema y modelo de Usuario:
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
    // sexo: {
    //     type: String,
    //     enum: ['H', 'M'],
    //     required: [true, 'El sexo es obligatorio']
    // }
});

const User = mongoose.model('users', userSchema);

// POST Usuario con hashing de contraseña
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            joinedAt: new Date()
            // sexo
        });

        const savedUser = await newUser.save();
        res.status(201).send({ mensaje: 'Usuario creado exitosamente', savedUser });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send({ error: 'El correo ya está registrado' });
        } else if (err.name === 'ValidationError') {
            const errores = {};
            for (let field in err.errors) {
                errores[field] = err.errors[field].message;
            }
            res.status(400).send({ error: 'Error de validación', detalles: errores });
        } else {
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
});

app.get('/api/users', (req, res) => {
    let name = req.query.name || '';
    User.find({ name: { $regex: name, $options: 'i' } })
        .then(docs => res.send(docs))
        .catch(err => res.status(400).send(err));
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const updates = req.body;

        // Si se incluye nueva contraseña, hashearla
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) return res.status(404).send({ error: 'Usuario no encontrado' });

        res.send({ mensaje: 'Usuario actualizado correctamente', updatedUser });
    } catch (err) {
        res.status(400).send({ error: 'Error al actualizar el usuario', detalles: err });
    }
});

app.delete('/api/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(doc => res.send({ mensaje: "Usuario eliminado", doc }))
        .catch(err => res.status(400).send(err));
});

// Esquema y modelo de Producto:
let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    availability: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        default: 1
    },
    dateUploaded: {
        type: Date,
        required: true
    },
    timesSold: {
        type: String,
        required: true,
        default: 0
    }
});

const Product = mongoose.model('products', productSchema);

// CRUD Productos:
app.post('/api/products', (req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
});

app.get('/api/products', (req, res) => {
    Product.find().then(docs => res.send(docs)).catch(err => res.status(400).send(err));
});

app.get('/api/products/:id', (req, res) => {
    Product.findById(req.params.id).then(doc => res.send(doc)).catch(err => res.status(400).send(err));
});

app.put('/api/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err));
});

app.delete('/api/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(doc => res.send({ mensaje: "Producto eliminado", doc }))
        .catch(err => res.status(400).send(err));
});

// LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Contraseña incorrecta' });
        }

        res.status(200).send({ mensaje: 'Inicio de sesión exitoso', user });
    } catch (err) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log("Aplicación corriendo en puerto " + port);
});