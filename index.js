const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Para procesar datos de formulario
app.use(express.json()); // Para procesar datos JSON
app.use(express.static(path.join(__dirname, "public"))); // Para servir archivos estáticos (CSS, JS, imágenes, etc.)

// Motor de plantillas
app.set("view engine", "ejs"); // Para renderizar plantillas EJS
app.set("views", path.join(__dirname, "views")); // Para especificar la carpeta donde se encuentran las plantillas

// Conexión DB
const dataBase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "formulario",
});

dataBase.connect((error) => {
  if (error) throw error;
  console.log("✅ Conectado a MySQL");
});

// Rutas
app.get("/", (req, res) => {
  res.render("registro");
});

app.post("/validar", (req, res) => {
  const { cedula, nombre, apellido, email, telefono, direccion, password } =
    req.body;

  const query = `
    INSERT INTO usuarios (cedula, nombre, apellido, email, telefono, direccion, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const valores = [
    cedula,
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    password,
  ];

  dataBase.query(query, valores, (error) => {
    if (error) {
      console.error("❌ Error al insertar:", error);
      return res.send("Ocurrió un error.");
    }
    console.log("✅ Registro exitoso");
    res.send("Registro exitoso");
    // dataBase.end();
  });
});

// Servidor
app.listen(3000, () => {
  console.log("🚀 Servidor en http://localhost:3000");
});

//consulta de usuarios

// const usuarios = "SELECT * FROM `usuarios`";
// dataBase.query(usuarios, (error, resultados) => {
//   if (error) {
//     throw error;
//   } else {
//     console.log("usuarios ", resultados);
//   }
// });
