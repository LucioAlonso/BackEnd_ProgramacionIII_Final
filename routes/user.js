const User = require("../models/user");
const Person = require("../models/person");
const express = require("express");
const app = express();

app.post("/user/register", async (req, res) => {
    console.log(req.body);

    let body = req.body;

    let user = new User({
        userName: body.userName,              
        password: body.password,    
        rol: body.rol,
    })


    //ACA TENGO QUE HACER LA COMPARACION DE SI EXISTE EL User O NO EN LA BASE DE DATOS
    if((await User.find({userName : user.userName})).length == 0){
        let person = new Person({
            user: user.userName,
            name: "",              
            lastname: "",    
            dni: "",
            mail: "",
            phone: ""
        })
        try{
            let result = await user.save();  
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





module.exports = app;          //lo devolvemos por si otro quiere usarlo 