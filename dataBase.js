const mySql = require("mysql2"); //libreria para conectar con mysql

//crear conecion con la base de datos con mysql
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurante",
});

//EXAMINAR SI FUE EXITOSA LA CONECCION
connection.connect(function (err) {
  if (err) {
    console.log("el error es: ", err);
  } else {
    console.log("Conexión exitosa!");
  }
});

//primera consulta
const menu = "SELECT * FROM `menu`";

connection.query(menu, function (error, lista) {
  if (error) {
    console.log("error: ", error);
  } else {
    console.log("lista del menú: ", lista);
  }
});

//para que no siga corriendo la conexion
connection.end();
