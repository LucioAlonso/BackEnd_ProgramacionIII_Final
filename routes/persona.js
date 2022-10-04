const Persona = require("../models/persona");
const express = require("express");
const app = express();

app.get("/persona/all", (req, res) => {
    Persona.find().exec((err, data) => {

        if(err){
            res.status(500).json({
                res:"fail",
                err
            }); 
        } 

        res.json({
            res:"ok",
            personas: data
        }); 
    });
})

app.get("/persona/:id", (req, res) => {         //al anteponerle : adelante a id, la conviente en una variable
    const id = req.params.id;                          //asi se resiben los parametros
    res.json({
        res:"ok",
        personas:{_id: id}                    //el _id es el que llega de mongo, el id solo es el que pasamos como parametro
    });
})

app.post("/persona/add", async (req, res) => {
    console.log(req.body); //es por donde se manda la informacion, osea por detras y no por la url

    let body = req.body;

    let persona = new Persona({
        nombre: body.nombre,              
        apellido: body.apellido,    
        dni: body.dni,
        mail: body.mail,
        telefono: body.telefono
    })

    try{
        let result = await persona.save();  
        res.status(200).json({
            res:"ok",
            personaAgregada: result
        });
    } catch (err){
        res.status(500).json({
            err
        })
    }
})

app.put("/persona/edit", (req, res) => {
    res.json({
        res:"ok",
        personasEditada:{}
    });
})

app.delete("/persona/delete", (req, res) => {
    res.json({
        res:"ok",
        personasBorrada:{}
    });
})

module.exports = app;          //lo devolvemos por si otro quiere usarlo