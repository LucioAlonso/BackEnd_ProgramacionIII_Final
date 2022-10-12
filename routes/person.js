const Person = require("../models/person");
const express = require("express");
const {checkRol, verifyToken, checkUserOrAdmin} = require("../middlewares/authentication")
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

app.get("/person/:id", (req, res) => {         //al anteponerle : adelante a id, la conviente en una variable
    const id = req.params.id;                          //asi se resiben los parametros
    res.status(200).json({
        res:"ok",
        persons:{_id: id}                    //el _id es el que llega de mongo, el id solo es el que pasamos como parametro
    });
})

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

app.put("/person/edit",async (req, res) => {

    let {name, lastname, dni, mail, phone, state} = req.body;
    let person = new Person({
        name,              
        lastname,    
        dni,
        mail,
        phone,
        state
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

app.delete("/person/delete", [verifyToken, checkUserOrAdmin] , (req, res) => {
    res.status(200).json({
        res:"ok",
        personDelete:{}
    });
})

module.exports = app;          //lo devolvemos por si otro quiere usarlo