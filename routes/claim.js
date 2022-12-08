const Claim = require("../models/claim");
const ClaimsType = require("../models/ClaimsType");
const {checkRol, verifyToken, checkIsSameUserOrAdmin,checkIsSameUserOrAdmin2} = require("../middlewares/authentication")
const {createClaim, claimTypes, promedios_resueltos_catergoria} = require("../helpers/auxiliaryFunctions");
const express = require("express");
const Person = require("../models/person");
const { find } = require("../models/person");
const app = express();
const date = new Date();

app.post("/claim/:userID/add", [verifyToken], async (req, res) => {
    claim = createClaim(req);
    claim.createDate = date;
    Person.findById(req.params.userID).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res : false,
                err
            })
        }else if(!data){
            res.status(400).json({
                res : "No user with that id was found."
            })
        } else {
            if(claim.claim != '' && claim.category != '' && claim.residence != ''){
                let result = await claim.save();
                res.status(200).json({
                    res : "ok",
                    result
                })
            } else {
                res.status(500).json({
                    res : 'Complete todos los campos'
                })
            }
        }
    })
})

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

app.get("/claim/pendiented/all", [verifyToken, checkRol],(req, res) => {         //solamente un administrador lo puede usar
    Claim.find({resolveDate : null}).exec((err, data) => {
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

app.get("/claim/resolved/all", [verifyToken, checkRol],(req, res) => {         //solamente un administrador lo puede usar y devuelve lo constrario de lo que deberia//////
    Claim.find({resolveDate : null}).exec((err, data) => {
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

app.get("/claim/:userID/all", [verifyToken, checkIsSameUserOrAdmin], (req, res) => {         
    Claim.find({_idUser : req.params.userID}).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res : false,
                err
            })
        }else if (!data){
            res.status(400).json({
                res : "No complaints were found for that user."
            })
        } else {
            res.status(200).json({
                res : "ok",
                data
            })
        }
    })                      
})

app.get("/claim/:userID/list/resolved", [verifyToken, checkIsSameUserOrAdmin], async (req, res) => { //devuelve lo contrario de lo que deberia////////////
    Claim.find({_idUser : req.params.userID, resolveDate : null}).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res : false,
                err
            })
        }else if(!data){
            res.status(400).json({
                res : "No user with that id was found."
            })
        } else {
            res.status(200).json({
                res : "ok",
                data
            })
        }
    })
})

app.get("/claim/:userID/list/pendiented", [verifyToken, checkIsSameUserOrAdmin], async (req, res) => {
    Claim.find({_idUser : req.params.userID, resolveDate : null}).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res : false,
                err
            })
        }else if(!data){
            res.status(400).json({
                res : "No user with that id was found."
            })
        } else {
            res.status(200).json({
                res : "ok",
                data
            })
        }
    })
})

app.post("/claim/:claimID/resolved", [verifyToken, checkRol],(req, res) => {
    Claim.findById(req.params.claimID).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res : false,
                err
            })
        }else if(!data){
            res.status(400).json({
                res : "The id does not correspond to any claim."
            })
        } else {
            data.resolveDate = date;
            data.state = "disabled";
            let result = await data.save();
            res.status(200).json({
                res : true,
                result
            })
        }
    })  
})

app.post("/claim/:userID/:claimID/disabled", [verifyToken, checkIsSameUserOrAdmin],(req, res) => {
    Claim.findById(req.params.claimID).exec(async (err, data) => {
        data.state = "disabled";
        let result = await data.save();
        res.status(200).json({
            res : true,
            result
        })
    })  
})

app.post("/claim/:userID/:claimID/enabled", [verifyToken, checkIsSameUserOrAdmin],(req, res) => {
    Claim.findById(req.params.claimID).exec(async (err, data) => {
        data.state = "enabled";
        let result = await data.save();
        res.status(200).json({
            res : true,
            result
        })
    })  
})


//no se borran los datos, simplemente se cambia el valor de la variable state
app.delete("/claim/delete", (req, res) => {
    res.json({
        res:"ok",
        claimDelete:{}
    });
})

//no se deberian poder hacer modificiones en los reclamos (a menos que cree un sistema para que advierta cuando fue modificado)
app.put("/claim/edit", (req, res) => {
    res.json({
        res:"ok",
        claimEdited:{}
    });
})


////////////////////////////////////////////////////////////////////////
////PARCIAL2

app.get("/reclamos/parcial2", [verifyToken, checkIsSameUserOrAdmin2], (req, res) => {    
    if(req.user.userRol == "admin"){
        Claim.find().exec((err, data) => {
            if(err){
                res.status(500).json({
                    res:"fail",
                    err
                }); 
            }else if (!data){
                res.status(400).json({
                    res : "No claim found."
                })
            } else {

                res.status(200).json({
                    res:"ok",
                    claims : claimTypes(data)
                });   
            }
            
        });
    } else {
        Claim.find({_idUser : req.user.userID}).exec(async (err, data) => {
            if(err){
                res.status(500).json({
                    res : false,
                    err
                })
            }else if (!data){
                res.status(400).json({
                    res : "No complaints were found for that user."
                })
            } else {
                res.status(200).json({
                    res : "ok",
                    claims : claimTypes(data)
                })
            }
        })  
    }                 
})

////////////////////////////////////////////////////////////////////////
////RECUPERATORIO PARCIAL 2

app.get("/reclamos/prom", [verifyToken, checkRol], (req, res) => {    
    Claim.find({createDate: { $ne: null }, resolveDate: { $ne: null }}).exec((err, data) => { //ne significa not equal
        if(err){
            res.status(500).json({
                res:"Failed to search for claims.",
                err
            }); 
        }else if (!data){
            res.status(400).json({
                res : "No claims found."
            })
        } else {
            res.status(200).json({
                promedios : promedios_resueltos_catergoria(data)
            })
        }   
    });                  
})



module.exports = app;          //lo devolvemos por si otro quiere usarlo