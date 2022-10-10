const Person = require("../models/person");
const express = require("express");
const app = express();

app.get("/person/all", (req, res) => {
    Person.find().exec((err, data) => {

        if(err){
            res.status(500).json({
                res:"fail",
                err
            }); 
        } 

        res.json({
            res:"ok",
            Persons: data
        }); 
    });
})

app.get("/person/:id", (req, res) => {         //al anteponerle : adelante a id, la conviente en una variable
    const id = req.params.id;                          //asi se resiben los parametros
    res.json({
        res:"ok",
        persons:{_id: id}                    //el _id es el que llega de mongo, el id solo es el que pasamos como parametro
    });
})

app.post("/person/add", async (req, res) => {
    console.log(req.body); //es por donde se manda la informacion, osea por detras y no por la url

    let body = req.body;

    let person = new Person({
        name: body.name,              
        lastname: body.lastname,    
        dni: body.dni,
        mail: body.mail,
        phone: body.phone
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
    let body = req.body;

    let person = new Person({
        name: body.name,              
        lastname: body.lastname,    
        dni: body.dni,
        mail: body.mail,
        phone: body.phone
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

app.delete("/person/delete", (req, res) => {
    res.json({
        res:"ok",
        personDelete:{}
    });
})

module.exports = app;          //lo devolvemos por si otro quiere usarlo