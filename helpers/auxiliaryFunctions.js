const User = require("../models/user");
const Person = require("../models/person");
const Claim = require("../models/claim");
const ClaimsType = require("../models/ClaimsType");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const createUserAndPerson = (req) => {
    const {userName, password, name, lastname, dni, phone, mail} = req.body;
    return [ user = new User({
        userName,              
        password : bcrypt.hashSync(password, salt),    
        rol : "taxpayer",
        state : "enabled"
    }), person = new Person({
        _id : user._id,
        name,              
        lastname,    
        dni,
        mail,
        phone,
        state: "enabled"
    })]
}

const createUser = (req) => {
    const {userName, password, rol, state} = req.body;
    return user = new User({
        userName,              
        password,    
        rol,
        state
    })
}

const createPerson = (req) => {
    let {name, lastname, dni, mail, phone, state} = req.body;
    return person = new Person({
        name,              
        lastname,    
        dni,
        mail,
        phone,
        state
    })
}

const createClaim = (req) => {
    let {claim, category, residence} = req.body;
    return new Claim({
        _idUser : req.params.userID,
        claim,
        createDate : Date,
        resolveDate : "",
        category,
        residence,
        state : "enabled"
    })
}

//parcial 2
const claimTypes = (data) => {
    const categories = ["alumbrado", "arbolado", "pluvial", "limpieza"]
    return categories.map(c => [
        res = {
            type : c,
            amount : data.filter(p => p.category === c).length,
            streets : data.filter(p => p.category === c).map(p => p.residence)
        }
    ])
}

//Recuperatorio parcial 2
const claimsCategories = (data) => {          //funcion para obtener las categorias de la busqueda obtenida
    let categories = []
    data.map(c => categories.push(c.category))
    categoriesArray = new Set (categories)
    return cat = [...categoriesArray]
}

const promedios_resueltos_catergoria = (data) => {
    claimsCategories(data)
    return cat.map(c => 
        promedio = {
            cat : c,
            prom_dias_resolucion : Math.round((data.filter(d => (d.category == c)).map(f =>((f.resolveDate - f.createDate)/86400000)).reduce((acu, p) => acu + p) / data.filter(d => (d.category == c)).length))
        })
}
module.exports = {createUserAndPerson, createUser, createPerson, createClaim, claimTypes, promedios_resueltos_catergoria};