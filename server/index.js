const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const cors = require("cors");
// const crypto = require("crypto");
const multer = require('multer');
const path = require('path');

const jwtSecret =
  "875032869ee3511558cd74b5be1d517dc63b74bfc92abdc54ba253a619c80ce5"; // Cambia esto por una cadena secreta segura

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "ngguser",
  password: "3A49CD5A3D3475E4D16778B7E69D44A81C795B86F",
  database: "ngg",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

// Ruta para manejar la carga de archivos
app.post('/upload', upload.array('images', 10), (req, res) => {
  // 'images' es la key usada en formData.append
  // '10' es el número máximo de archivos que se pueden subir a la vez

  try {
    console.log(req.files);
    res.status(200).send('Archivos subidos correctamente');
  } catch (error) {
    res.status(400).send('Error al subir los archivos');
  }
});






// const registerAdmin = async (username, email, password) => {
//   try {
//     // Hashear la contraseña con bcrypt
//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     // Consulta SQL para insertar un nuevo usuario en la base de datos
//     const query = "INSERT INTO usuarios (username, email, password_hash, role) VALUES (?, ?, ?, ?)";
//     const values = [username, email, passwordHash, 'admin'];

//     // Ejecutar la consulta SQL
//     db.execute(query, values, (err, results) => {
//       if (err) {
//         console.error("Error al insertar el usuario:", err);
//         return;
//       }
//       console.log("Usuario administrador registrado exitosamente:", results.insertId);
//     });
//   } catch (err) {
//     console.error("Error al hashear la contraseña:", err);
//   }
// };

// // Ejemplo de uso
// registerAdmin('nachofaith', 'ruben.godoy@ngg.cl', '');

// Ruta para registrar un nuevo usuario
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validar el rol
  if (role && !["admin", "client"].includes(role)) {
    return res.status(400).send("Rol inválido");
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const query =
    "INSERT INTO usuarios (username, email, password_hash, role) VALUES (?, ?, ?, ?)";

  db.execute(
    query,
    [username, email, hashedPassword, role || "client"],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error al registrar el usuario" + result);
      }
      res.status(201).send("Usuario registrado exitosamente");
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query =
    "SELECT id, username, email, password_hash, role FROM usuarios WHERE email = ?";

  db.execute(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send("Error en la consulta");
    }
    if (results.length === 0) {
      return res.status(401).send("Usuario no encontrado");
    }

    const user = results[0];

    // Verificar si la contraseña proporcionada coincide con el hash almacenado usando bcrypt
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        jwtSecret,
        { expiresIn: "1h" }
      );

      // Configurar la cookie segura con HttpOnly y SameSite
      res.cookie("authToken", token, {
        httpOnly: true, // Hace que la cookie no sea accesible mediante JavaScript
        secure: true, // La cookie solo se envía a través de HTTPS
        sameSite: "Strict", // Previene ataques CSRF
        maxAge: 60 * 60 * 1000, // 1 hora en milisegundos
      });

      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).send("Contraseña incorrecta");
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).send("Logout successful");
});

// Ruta para eliminar un usuario
app.post("/delete", async (req, res) => {
  const { email } = req.body;

  const query = "DELETE FROM usuarios WHERE email = ?";

  db.execute(query, [email], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar el usuario" + result);
    }
    res.status(201).send("Usuario registrado exitosamente");
  });
});

// Ruta de ejemplo que obtiene datos de la base de datos
app.get("/users", (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }
    res.json(results);
  });
});

///////MARCAS////////////

//Ruta para mostrar Marcas
app.get("/marcas", (req, res) => {
  const query = "SELECT * FROM marca";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar una nueva Marca
app.post("/marcaRegister", async (req, res) => {
  const { nombreMarca } = req.body;
  const query = "INSERT INTO marca (nombre_marca) VALUES (?)";

  db.execute(query, [nombreMarca], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar la marca" + result);
    }
    res.status(201).send("Marca registrada correctamente");
  });
});

// Ruta para actualizar una nueva Marca
app.post("/marcaUpdate", async (req, res) => {
  const { idMarca, nombreMarca } = req.body;
  const query = "UPDATE marca SET nombre_marca = ? WHERE id_marca = ?";

  db.execute(query, [nombreMarca, idMarca], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar la marca" + result);
    }
    res.status(201).send("Marca registrada correctamente");
  });
});

// Ruta para eliminar una Marca
app.post("/marcaDelete", async (req, res) => {
  const { id_marca } = req.body;

  const query = "DELETE FROM marca WHERE id_marca = ?";

  db.execute(query, [id_marca], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar el usuario" + result);
    }
    res.status(201).send("Usuario registrado exitosamente");
  });
});

/////////CATEGORIAS////////////

//Ruta para mostrar Categorias
// app.get("/categoria", (req, res) => {
//   const query = "SELECT * FROM categoria";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error ejecutando la consulta:", err);
//       res.status(500).json({ error: "Error en el servidor" });
//       return;
//     }
//     res.json(results);
//   });
// });


app.get("/categoria", (req, res) => {
  // Consulta para obtener categorías con el conteo de subcategorías
  const query = `
    SELECT 
      c.id_cat, 
      c.nombre_cat, 
      COUNT(sc.id_subCat) AS subCategoriaCount
    FROM 
      categoria c
    LEFT JOIN 
      sub_categoria sc
    ON 
      c.id_cat = sc.categoria_id_cat
    GROUP BY 
      c.id_cat, c.nombre_cat
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }
    res.json(results);
  });
});



//Ruta para mostrar Categorias
app.post("/subCategoria", (req, res) => {
  const { idCat } = req.body;
  const query = "SELECT * FROM sub_categoria WHERE categoria_id_cat = ?";
  db.query(query, [idCat], (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar una nueva Categoria
app.post("/catRegister", async (req, res) => {
  const { nombreCat } = req.body;
  const query = "INSERT INTO categoria (nombre_cat) VALUES (?)";

  db.execute(query, [nombreCat], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar la marca" + result);
    }
    res.status(201).send("Marca registrada correctamente");
  });
});

// Ruta para actualizar una nueva Categoria
app.post("/catUpdate", async (req, res) => {
  const { id, name } = req.body;
  const query = "UPDATE categoria SET nombre_cat = ? WHERE id_cat = ?";

  db.execute(query, [name, id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al actualizar la categoria" + result);
    }
    res.status(201).send("Categoria actualizada correctamente");
  });
});

// Ruta para eliminar una Marca
app.post("/catDelete", async (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM categoria WHERE id_cat = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al reliminar la categoria" + result);
    }
    res.status(201).send("Categoria eliminada exitosamente");
  });
});

// Ruta para registrar una nueva Categoria
app.post("/subCatRegister", async (req, res) => {
  const { idCat, nombreSubCat } = req.body;
  const query =
    "INSERT INTO sub_categoria (nombre_subCat, categoria_id_cat) VALUES (?,?)";

  db.execute(query, [nombreSubCat, idCat], (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar la marca" + result);
    }
    res.status(201).send("Sub Categoria registrada correctamente");
  });
});



// Ruta para eliminar una Marca
app.post("/subCatDelete", async (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM sub_categoria WHERE id_subCat = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al reliminar la categoria" + result);
    }
    res.status(201).send("Categoria eliminada exitosamente");
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



