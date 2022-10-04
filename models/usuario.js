const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
    userName: String,              
    password: String,
    rol: String
})

const Usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuario;