const Claim = require("../models/claim");
const {checkRol, verifyToken, checkIsSameUserOrAdmin} = require("../middlewares/authentication")
const {createUserAndPerson, createUser, createPerson, createClaim} = require("../helpers/auxiliaryFunctions");
const express = require("express");
const app = express();

app.get("/claim/all", [verifyToken, checkRol],(req, res) => {         //solamente un administrador lo puede usar
    Claim.find().exec((err, data) => {
        if(err){
            res.status(500).json({
                res:"fail",
                err
            }); 
        } 
        res.status(200).json({
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
    claim = createClaim();
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