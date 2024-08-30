const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const cors = require("cors");
// const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const jwtSecret =
  "875032869ee3511558cd74b5be1d517dc63b74bfc92abdc54ba253a619c80ce5"; // Cambia esto por una cadena secreta segura

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination:", file);
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    console.log("Filename:", fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", (req, res) => {
  console.log("Files:", req.files);
  console.log("Body:", req.body);
  upload.array("images", 10)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Error al subir los archivos" });
    }

    const files = req.files;
    const { frontFiles = [], idProd } = req.body; // Obtener el array de "front" e "idProd"

    if (files && files.length > 0) {
      try {
        await Promise.all(files.map((file, index) => {
          const fileName = file.filename;
          const isFront = frontFiles[index] === "true" ? 1 : 0;

          return new Promise((resolve, reject) => {
            const query = "INSERT INTO images (url_img, front) VALUES (?, ?)";
            db.query(query, [fileName, isFront], (err, result) => {
              if (err) {
                console.error("Error al insertar en la base de datos:", err);
                return reject("Error al guardar la información en la base de datos");
              }

              const idImg = result.insertId;

              const hasImagesQuery = "INSERT INTO has_images (id_prod, id_img) VALUES (?, ?)";
              db.query(hasImagesQuery, [idProd, idImg], (err, result) => {
                if (err) {
                  console.error("Error al insertar en la tabla has_images:", err);
                  return reject("Error al guardar la relación en has_images");
                }
                resolve();
              });
            });
          });
        }));

        res.status(200).send("Archivos subidos y nombres insertados en la base de datos correctamente");
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(400).json({ error: "No se subieron archivos" });
    }
  });
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
  const { selectedCategory } = req.body;
  const query = "SELECT * FROM sub_categoria WHERE categoria_id_cat = ?";
  db.query(query, [selectedCategory], (err, results) => {
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

// Ruta para registrar un nuevo usuario
app.post("/registerProd", async (req, res) => {
  const {
    nombreProd,
    descProd,
    stockProd,
    precioProd,
    precioProdOff,
    selectedMarca,
    selectedCategory,
    selectedSubcategory,
  } = req.body;

  const query =
    "INSERT INTO producto (nombre_prod, desc_prod, stock_prod, precio_prod, precio_off_prod, id_marca, id_subCat, id_cat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.execute(
    query,
    [
      nombreProd,
      descProd,
      stockProd,
      precioProd,
      precioProdOff,
      selectedMarca,
      selectedSubcategory,
      selectedCategory,
    ],
    (err, result) => {
      if (err) {
        console.log("Error al ingresar el Producto" + result + err);
        return res.status(500).send("Error al ingresar el Producto" + result);
      }
      const idProd = result.insertId;
      res
        .status(201)
        .json({ message: "Producto registrado exitosamente", idProd });
    }
  );
});

app.get("/products", async (req, res) => {
  // Consulta para obtener todos los productos
  const getProducts = () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          p.id_prod,
          p.nombre_prod,
          p.desc_prod,
          p.stock_prod,
          p.precio_prod,
          p.precio_off_prod,
          p.id_marca,
          m.nombre_marca,
          p.id_subCat,
          p.id_cat,
          c.nombre_cat
        FROM producto p
        INNER JOIN marca m ON p.id_marca = m.id_marca
        INNER JOIN categoria c ON p.id_cat = c.id_cat;
      `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  // Consulta para obtener las imágenes de todos los productos
  const getProductImages = () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          hi.id_prod,
          i.url_img,
          i.front
        FROM images i
        INNER JOIN has_images hi ON i.id_img = hi.id_img;
      `;
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  try {
    const [products, images] = await Promise.all([
      getProducts(),
      getProductImages(),
    ]);

    // Organizar las imágenes por producto
    const productsWithImages = products.map((product) => {
      return {
        ...product,
        images: images
          .filter((image) => image.id_prod === product.id_prod)
          .map((image) => ({
            url_img: image.url_img,
            front: image.front,
          })),
      };
    });

    // Enviar la respuesta con los productos y sus imágenes
    res.json(productsWithImages);
  } catch (error) {
    console.error("Error fetching products data:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para eliminar una Marca
app.post("/deleteProd", async (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM producto WHERE id_prod = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error al eliminar el producto" + result);
    }
    res.status(201).send("Producto eliminado exitosamente");
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
