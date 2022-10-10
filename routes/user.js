const User = require("../models/user");
const Person = require("../models/person");
const express = require("express");
const app = express();

app.post("/user/register", async (req, res) => {
    let body = req.body;

    let user = new User({
        userName: body.userName,              
        password: body.password,    
        rol: body.rol,
    })

    //ACA TENGO QUE HACER LA COMPARACION DE SI EXISTE EL User O NO EN LA BASE DE DATOS
    if((await User.find({userName : user.userName})).length == 0){
        try{
            let result = await user.save();  

            let person = new Person({
                _id : user._id,
                user: user.userName,
                name: "",              
                lastname: "",    
                dni: "",
                mail: "",
                phone: ""
            })

            console.log(person.fullName)
            await person.save();  
            res.status(200).json({
                res:"ok",
                UserAdd: result
            });
        } catch (err){
            res.status(500).json({
                err
            })
        }
    }
    else
    {
        res.status(500).json({
            err : "A user with that name already exists"
        })
    }    

})

app.post("/user/login", async (req, res) => {
    let body = req.body;

    let user = new User({
        userName: body.userName,              
        password: body.password,    
        rol: body.rol,
    })
       
    User.find({userName : user.userName, password : user.password } ).exec((err, data) => {

        try{
            if (data[0]["rol"] === "admin"){
                console.log("el usuario puede ingresar como ADMINISTRADOR")  
            } else {
                console.log("el usuario puede ingresar como CONTRIBUYENTE")
            }
    
            res.json({
                res:"ok",
                login: "ok",
                rol : data[0]["rol"]
            });
        }catch{
            res.status(500).json({
                res:"fail",
                error: "The username or password entered is invalid"
            }); 
        } 
    })
})



module.exports = app;          //lo devolvemos por si otro quiere usarlo 