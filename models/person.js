const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
    user: String,
    name: String,              //version corta
    lastname: String,    
    dni: String,
    mail: String,
    phone: String
    /* otras variantes
    activo: Boolean,
    cantHijos: Number,
    nacimiento: Date,
    _autoId: mongoose.Schema.Types.ObjectId //para un tipo id (empiezan por convencion siempre con _ al comienzo)
    */
})

personSchema.virtual("fullName").get(()=>{
    return `${this.name}  ${this.lastname}`;
})

const Person = mongoose.model("persons", personSchema) //"Personas" es nombre de la coleccion en la base MongoDb

module.exports = Person;