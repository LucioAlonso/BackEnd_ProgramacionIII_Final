const User = require("../models/user");
const Person = require("../models/person");
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
    let {name, lastname, dni, mail, phone} = req.body;
    return claim = new Claim({
        name,              
        lastname,    
        dni,
        mail,
        phone,
    })
}


module.exports = {createUserAndPerson, createUser, createPerson, createClaim};