//Modulos requeridos para el proyecto

const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre llamadas de sitios
const producto = express.Router(); //Trae el metodo router de express para hacer los endpoints
const conex = require("./bdatos.js");

//Construimos la capa intermedia de la aplicacion MIDDLEWARE
producto.use(express.json()); //Serializa la data en JSON
producto.use(cors()); //Permite el acceso de otras direciones IP distintas a mi servicio
producto.options("*", cors()); //Configura las IP admitidas por cors, * significa que las acepta todas

//Codificamos los verbos HTTP (CRUD tipico)

//Verbo GET LISTAR
producto.get("/producto", (req, res) => {
  conex.query("SELECT * FROM producto", (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

//Verbo POST INSERTAR
producto.post("/producto", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query("INSERT INTO producto SET ?", data, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//Verbo PUT ACUTALIZAR
producto.put("/producto/:idProducto", (req, res) => {
  let id = req.params.idProducto;
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query(
    "UPDATE producto SET ? WHERE idProducto = ?",
    [data, id],
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});

//Verbo DELETE ELIMINAR
producto.delete("/productos/:idProducto", (req, res) => {
  let id = req.params.idProducto;
  conex.query("DELETE FROM producto WHERE idProducto = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    };
});

module.exports = producto;
