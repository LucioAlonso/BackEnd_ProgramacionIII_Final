const User = require("../models/user");
const Person = require("../models/person");
const {checkRol, verifyToken, checkIsSameUserOrAdmin} = require("../middlewares/authentication");
const {generateJWT} = require("../helpers/generator-jwt");
const {createUserAndPerson, createUser} = require("../helpers/auxiliaryFunctions");
const express = require("express");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const app = express();

app.post("/user/register", async (req, res) => {
    const [user, person] = createUserAndPerson(req);

    if(user.userName != ''){
        if(!(await User.findOne({userName : user.userName}))){
            if(person.mail == '' || person.name == '' || person.lastname == '' || person.dni == '' || person.phone == ''){
                res.status(500).json({
                    err : 'Complete todos los campos faltantes'
                })
            } else {
                let result = await user.save();  
                await person.save();  
                res.status(200).json({
                    res:"ok",
                    UserAdd: result
                });
            }
        } else {
            res.status(500).json({
                err : "Ya existe un usuario con ese nombre"
            })
        } 
    } else {
        res.status(500).json({
            err : 'Coloque un nombre de usuario valido'
        })
    }
})

app.post("/user/login", (req, res) => {
    const user = createUser(req);
    User.findOne({userName : user.userName, state : "enabled"} ).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res:"fail",
                err
            });
        } else if(!data){
            res.status(400).json({
                res:"fail",
                error: "El usuario o la contraseña ingresados son invalidos"
            }); 
        } else if (bcrypt.compareSync(user.password, data.password)){
            const token = await generateJWT(data._id);
            res.status(200).json({
                data,
                token
            })
        } else {
            res.status(200).json({
                res:"fail",
                error: "El usuario o la contraseña ingresados son invalidos"
            })
        }
    })
})

app.post("/user/disabled", [verifyToken, checkIsSameUserOrAdmin],(req, res) => {
    User.findById(req.body.userID).exec(async (err, data) => {
        data.state = "disabled";
        let result = await data.save();
        Person.findById(req.body.userID).exec(async(err, data) =>{
            data.state = "disabled";
            data.save();
        })

        res.status(200).json({
            res : true,
            result
        })
    })  
})

app.post("/user/enabled", [verifyToken, checkRol],(req, res) => {
    User.findById(req.body.userID).exec(async (err, data) => {
        data.state = "enabled";
        let result = await data.save();

        Person.findById(req.body.userID).exec(async(err, data) =>{
            data.state = "enabled";
            data.save();
        })

        res.status(200).json({
            res : true,
            result
        })
    })  
})

module.exports = app;          //lo devolvemos por si otro quie