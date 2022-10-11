const User = require("../models/user");
const Person = require("../models/person");
const {generateJWT} = require("../helpers/generator-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);

const app = express();

app.post("/user/register", async (req, res) => {
    let {userName, rol} = req.body;

    let user = new User({
        userName,              
        password: bcrypt.hashSync(req.body.password, salt),   
        rol : "taxpayer",
        state : "enabled"
    })

    if(!(await User.findOne({userName : user.userName}))){
            let result = await user.save();  
            let person = new Person({
                _id : user._id,
                name: "",              
                lastname: "",    
                dni: "",
                mail: "",
                phone: "",
                state: "enabled"
            })

            console.log(person.fullName)
            await person.save();  
            res.status(200).json({
                res:"ok",
                UserAdd: result
            });
    }
    else
    {
        res.status(500).json({
            err : "A user with that name already exists"
        })
    } 
})

app.post("/user/login", (req, res) => {
    const {userName, password, rol} = req.body;
    let user = new User({
        userName,              
        password,    
        rol,
    })
    User.findOne({userName : user.userName} ).exec(async (err, data) => {
        if(err)                   //si hay un error con la conexion de la base de datos
        {
            res.status(500).json({
                res:"fail",
                err
            }); 
        }
        else if(!data){           //si no llega nada entonces no existe el usuario
            res.status(400).json({
                res:"fail",
                error: "The username or password entered is invalid"
            }); 
        }
        else (bcrypt.compareSync(password, data.password))      //esta el usuario, compara las constraseñas
        {
            const token = await generateJWT(data._id);
            res.status(200).json({
                user,
                token
            })
            /*
            if (data.rol === "admin"){
                console.log("el usuario puede ingresar como ADMINISTRADOR")  
            } else {
                console.log("el usuario puede ingresar como CONTRIBUYENTE")
            } */
        } 
    })
})



module.exports = app;          //lo devolvemos por si otro quiere usarlo 