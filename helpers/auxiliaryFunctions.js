const User = require("../models/user");
const Person = require("../models/person");
const Claim = require("../models/claim");
const ClaimsType = require("../models/ClaimsType");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const createUserAndPerson = (req) => {
    const {userName, password} = req.body;
    return [ user = new User({
        userName,              
        password : bcrypt.hashSync(req.body.password, salt),    
        rol : "taxpayer",
        state : "enabled"
    }), person = new Person({
        _id : user._id,
        name: "",              
        lastname: "",    
        dni: "",
        mail: "",
        phone: "",
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
    let {textClaim ,category, residence} = req.body;
    return claim = new Claim({
        _idUser : req.params.userID,
        textClaim,
        createDate : Date,
        resolveDate : "",
        category,
        residence,
        state : "enabled"
    })
}

const claimTypes = (data) => {
    const categories = ["alumbrado", "arbolado", "pluvial", "limpieza"]
    return categories.map(c => [
        res = {
            type : c,
            amount : data.filter(p => p.category === c).length,
            streets : data.filter(p => p.category === c).map(p => p.residence)
        }
    ])


    //return res
    /*
    return[arbolado = new ClaimsType({
        type : "Arbolado",
        amount : data.filter(p => p.category === "arbolado").length,
        streets : data.filter(p => p.category === "arbolado").map(p => p.residence)
    }),
    plurial = new ClaimsType({
        type : "Pluvial",
        amount : data.filter(p => p.category === "plurial").length,
        streets : data.filter(p => p.category === "plurial").map(p => p.residence)
    }),
    alumbrado = new ClaimsType({
        type : "Alumbrado",
        amount : data.filter(p => p.category === "alumbrado").length,
        streets : data.filter(p => p.category === "alumbrado").map(p => p.residence)
    }),
    limpieza = new ClaimsType({
        type : "Limpieza",
        amount : data.filter(p => p.category === "limpieza").length,
        streets : data.filter(p => p.category === "limpieza").map(p => p.residence)
    })] */
}
module.exports = {createUserAndPerson, createUser, createPerson, createClaim, claimTypes};