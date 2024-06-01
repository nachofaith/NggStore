const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');



const jwtSecret = '875032869ee3511558cd74b5be1d517dc63b74bfc92abdc54ba253a619c80ce5'; // Cambia esto por una cadena secreta segura

app.use(cors());
app.use(express.json());



// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ngguser',
    password: '3A49CD5A3D3475E4D16778B7E69D44A81C795B86F',
    database: 'ngg'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
  
    // Validar el rol
    if (role && !['admin', 'client'].includes(role)) {
      return res.status(400).send('Rol inválido');
    }
  
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO usuarios (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
    db.execute(query, [username, email, hashedPassword, role || 'client'], (err, result) => {
      if (err) {
        return res.status(500).send('Error al registrar el usuario');
      }
      res.status(201).send('Usuario registrado exitosamente');
    });
  });
  
  // Ruta para iniciar sesión
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT id, username, email, password_hash, role FROM usuarios WHERE email = ?';
    db.execute(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).send('Error en la consulta');
      }
      if (results.length === 0) {
        return res.status(401).send('Usuario no encontrado');
      }
  
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (isMatch) {
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, jwtSecret, { expiresIn: '1h' });
      
        res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
      } else {
        res.status(401).send('Contraseña incorrecta');
      }
    });
  });
  
  // Middleware para verificar token y rol
  function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Token no proporcionado');
    }
  
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(401).send('Token inválido');
      }
      req.user = user;
      next();
    });
  }
  
  function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).send('No tienes permiso para acceder a esta ruta');
      }
      next();
    };
  }
  
  // Ruta para obtener información del usuario autenticado
  app.get('/me', authenticateToken, (req, res) => {
    const query = 'SELECT id, username, email, role FROM usuarios WHERE id = ?';
    db.execute(query, [req.user.id], (err, results) => {
      if (err) {
        return res.status(500).send('Error en la consulta');
      }
      if (results.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(200).json(results[0]);
    });
  });
  
  // Ruta protegida solo para administradores
  app.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.status(200).send('Bienvenido, administrador');
  });

// Ruta de ejemplo que obtiene datos de la base de datos
app.get('/api/datos', (req, res) => {
    const query = 'SELECT * FROM prueba';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
