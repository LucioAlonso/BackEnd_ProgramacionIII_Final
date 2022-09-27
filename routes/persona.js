const persona = require("../models/persona");
const express = require("express");
const app = express();

app.get("/persona/all", (req, res) => {
    persona.find().exec((err, data) => {
        console.log(persona)
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

app.post("/persona/add", (req, res) => {
    res.json({
        res:"ok",
        personasAgregada:{}
    });
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