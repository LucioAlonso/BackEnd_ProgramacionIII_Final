const Person = require("../models/person");
const express = require("express");
const {checkRol, verifyToken, checkIsSameUserOrAdmin} = require("../middlewares/authentication");
const {createPerson} = require("../helpers/auxiliaryFunctions");
const app = express();

app.get("/person/all", [verifyToken, checkRol],(req, res) => {
    Person.find().exec((err, data) => {
        if(err){
            res.status(500).json({
                res:"fail",
                err
            }); 
        } 

        res.status(200).json({
            res:"ok",
            Persons: data
        }); 
    });
})

app.get("/person/:userID", [verifyToken, checkIsSameUserOrAdmin], (req, res) => {         //al anteponerle : adelante a id, la conviente en una variable
    Person.findOne( {_id : req.params.userID , state : "enabled"}).exec(async(err, data) =>{
        if(!data){
            res.status(400).json({
                res: "The person was not found"
            })
        } 
        else{
            res.status(200).json({
                res:"ok",
                data                   
            });   
        }
        
    })  
})

app.put("/person/edit", [verifyToken, checkIsSameUserOrAdmin],async (req, res) => {
    let person = createPerson(req);
    Person.findOne({_id : req.user.userID , state : "enabled"}).exec(async(err, data) =>{
        if(err){
            res.status(500).json({
            err
        })
        }
        else if (!data){
            res.status(400).json({
                res: "The person was not found"
            })
        } else {
            data.name = person.name;
            data.lastname = person.lastname;
            data.dni = person.dni;
            data.mail = person.mail;
            data.phone = person.phone;
            let result = await data.save();  
            res.status(200).json({
                res:"ok",
                personScheduled: result
            });
        }
    })     
})






//yo sacaria el delete persona, ya que si o si tiene que estar vinculado a un usuario, por lo tanto lo mejor es deshabilitar el usurio y la persona (que ya esta hecho)
app.delete("/person/delete", [verifyToken, checkIsSameUserOrAdmin] , (req, res) => {
    res.status(200).json({
        res:"ok",
        personDelete:{}
    });
})

//yo lo sacaria porque no se deberia poder crear una persona de forma individual ya que si o si tiene que estar vinculada a un usuario
app.post("/person/add", async (req, res) => {
    let {name, lastname, dni, mail, phone} = req.body;
    let person = new Person({
        name,              
        lastname,    
        dni,
        mail,
        phone,
        state : "enable"
    })

    try{
        let result = await person.save();  
        res.status(200).json({
            res:"ok",
            personScheduled: result
        });
    } catch (err){
        res.status(500).json({
            err
        })
    }
})

module.exports = app;          //lo devolvemos por si otro quiere usarlo