const mysql = require("mysql2");

const dataBase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "formulario",
});

dataBase.connect(function (error) {
  if (error) {
    throw error;
  } else console.log("Conectado con exito!");
});

const usuarios = "SELECT * FROM `usuarios`";

dataBase.query(usuarios, function (error, list) {
  if (error) {
    throw error;
  } else {
    console.log("lista de usuarios: ", list);
    dataBase.end();
  }
});
