//Modulos requeridos para el proyecto

const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); //Trae el metodo router de express para hacer los endpoints
const conex = require("./bdatos.js");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto node js  me permita usar   async/await opcion a fetch
const { error, Console } = require("console");
//Construimos la capa intermedia de la aplicacion MIDDLEWARE
usuario.use(express.json()); //Serializa la data en JSON
usuario.use(cors()); //Permite el acceso de otras direciones IP distintas a mi servicio
usuario.options("*", cors()); //Configura las IP admitidas por cors, * significa que las acepta todas

//Codificamos los verbos HTTP (CRUD tipico)

usuario.get("/usuarios", async (req, res) => {
  try {
    conex.query("SELECT idUsuario, nombre, email from usuarios", (error, respuesta) => {
      console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    console.log(error);
  }
});
//Verbo GET LISTAR
// usuario.get("/usuarios", (req, res) => {
//   conex.query("SELECT * FROM usuarios", (error, respuesta) => {
//     if (error) {
//       throw error;
//     } else {
//       res.send(respuesta);
//     }
//   });
// });

//Verbo POST INSERTAR

usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      email: req.body.email,
      PASSWORD: bcript.hashSync(req.body.PASSWORD),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      zonaPostal: req.body.zonaPostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
    };
    conex.query("insert into usuarios set ?", data, (error, respuesta) => {
      res.send("insercion exitosa");
    });
  } catch (error) {
    //res.send.status(404).error;
  }
});



//Verbo PUT ACUTALIZAR
usuario.put("/usuarios/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    constraseña: req.body.constraseña,
    direccion: req.body.direccion,
    cuidad: req.body.cuidad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  conex.query("UPDATE usuarios SET ? WHERE id = ?", [data, id], (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//Verbo DELETE ELIMINAR
usuario.delete("/usuarios/:id", (req, res) => {
  let id = req.params.idUsuario;
  conex.query("DELETE FROM usuarios WHERE id = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    };
});

// login de usuario
usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const PASSWORD = req.body.PASSWORD;
    //validamos que lleguen los datos completos
    if (!email || !PASSWORD) {
      console.log("debe enviar los datos completos");
    } else {
      conex.query("SELECT * FROM usuarios where email = ?", [email], async (error, respuesta) => {
        if (respuesta.length == 0 || !(await bcript.compare(PASSWORD, respuesta[0].PASSWORD))) {
          // res.send({ estado: true, nombre: "juanitorder" });
          res.sendStatus(200);
          
          // console.log("el usuario o contraseña  ingresada  no existen en la aplicacionn");
        } else {
          res.send(true);
          //enviamos las variables al front end  para que cargue  la pagina
          // console.log("bienvenido al sistema  de informacion");
        }
      });
    }
  } catch (error) {
    console.log("hay un error  en la conexion  con el  server");
  }
});

module.exports = usuario;
