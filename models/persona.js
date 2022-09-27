const mongoose = require("mongoose");
const personaSchema = new mongoose.Schema({
    Nombre: Number,              //version corta
    Apellido: {Type: String},    //version larga
    DNI: Number,
    Mail: String,
    Telefono: String,
    /* otras variantes
    activo: Boolean,
    cantHijos: Number,
    nacimiento: Date,
    _autoId: mongoose.Schema.Types.ObjectId //para un tipo id (empiezan por convencion siempre con _ al comienzo)
    */
})

personaSchema.virtual("fullName").get(()=>{
    return `${this.Nombre}  ${this.Apellido}`;
})

const Persona = mongoose.model("Personas", personaSchema) //"Personas" es nombre de la coleccion en la base MongoDb

module.exports = Persona;