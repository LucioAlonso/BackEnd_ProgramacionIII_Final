const ClaimsType = require("../models/ClaimsType");
const {checkRol, verifyToken, checkIsSameUserOrAdmin,checkIsSameUserOrAdmin2} = require("../middlewares/authentication")
const {createClaim, claimTypes, promedios_resueltos_catergoria} = require("../helpers/auxiliaryFunctions");
const express = require("express");

const app = express();

app.get("/claimTypes/all", (req, res) => {         //solamente un administrador lo puede usar
    ClaimsType.find().exec((err, data) => {
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

module.exports = app;          //lo devolvemos por si otro quiere usarlo