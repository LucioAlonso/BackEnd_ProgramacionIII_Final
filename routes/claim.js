const Claim = require("../models/claim");
const express = require("express");
const app = express();

app.get("/claim/all", (req, res) => {
    claim.find().exec((err, data) => {

        if(err){
            res.status(500).json({
                res:"fail",
                err
            }); 
        } 

        res.json({
            res:"ok",
            claims: data
        }); 
    });
})

app.get("/claim/:id", (req, res) => {         //al anteponerle : adelante a id, la conviente en una variable
    const id = req.params.id;                          //asi se resiben los parametros
    res.json({
        res:"ok",
        claims:{_id: id}                    //el _id es el que llega de mongo, el id solo es el que pasamos como parametro
    });
})

app.post("/claim/add", async (req, res) => {
    console.log(req.body); //es por donde se manda la informacion, osea por detras y no por la url

    let body = req.body;

    let claim = new Claim({
        name: body.name,              
        lastname: body.lastname,    
        dni: body.dni,
        mail: body.mail,
        phone: body.phone
    })

    try{
        let result = await claim.save();  
        res.status(200).json({
            res:"ok",
            claimScheduled: result
        });
    } catch (err){
        res.status(500).json({
            err
        })
    }
})

app.put("/claim/edit", (req, res) => {
    res.json({
        res:"ok",
        claimEdited:{}
    });
})

app.delete("/claim/delete", (req, res) => {
    res.json({
        res:"ok",
        claimDelete:{}
    });
})

module.exports = app;          //lo devolvemos por si otro quiere usarlo