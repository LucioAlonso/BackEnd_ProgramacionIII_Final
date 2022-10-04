const Usuario = require("../models/usuario");
const express = require("express");
const app = express();

app.post("/usuario/register", async (req, res) => {
    console.log(req.body);

    let body = req.body;

    let usuario = new Usuario({
        userName: body.userName,              
        password: body.password,    
        rol: body.rol,
    })

    try{
        let result = await usuario.save();  
        res.status(200).json({
            res:"ok",
            usuarioAgregada: result
        });
    } catch (err){
        res.status(500).json({
            err
        })
    }
})


module.exports = app;          //lo devolvemos por si otro quiere usarlo