const express = require("express");
const app = express();

//Aca vendrian luego los demas pedidos de las rutas de las demas entidades
app.use(require("./persona"));


module.exports = app;  