const mongoose = require("mongoose");
const personaSchema = new mongoose.Schema({
    nombre: String,              //version corta
    apellido: String,    
    dni: String,
    mail: String,
    telefono: String
    /* otras variantes
    activo: Boolean,
    cantHijos: Number,
    nacimiento: Date,
    _autoId: mongoose.Schema.Types.ObjectId //para un tipo id (empiezan por convencion siempre con _ al comienzo)
    */
})

personaSchema.virtual("fullName").get(()=>{
    return `${this.nombre}  ${this.apellido}`;
})

const Persona = mongoose.model("personas", personaSchema) //"Personas" es nombre de la coleccion en la base MongoDb

module.exports = Persona;