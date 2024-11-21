const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia según tu configuración
    database: 'biblioteca'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
    const query = 'SELECT * FROM libros';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).send('Error en el servidor.');
        } else {
            res.json(results);
        }
    });
});

// Ruta para añadir un libro
app.post('/libros', (req, res) => {
    const { autor, titulo, genero, puerta, balda } = req.body;
    const query = 'INSERT INTO libros (autor, titulo, genero, puerta, balda) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [autor, titulo, genero, puerta, balda], (err, results) => {
        if (err) {
            console.error('Error insertando libro:', err);
            res.status(500).send('Error en el servidor.');
        } else {
            res.json({ id: results.insertId });
        }
    });
});

// Inicia el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
