const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkRol = (req, res, next) =>{        //next es el siguiente middleware
    User.findById(req.user.userID).exec(async (err, data) => { 
        if(err){
            res.status(400).json({
                ok : false,
                err
            })  
        }
        else if( data.rol  == "admin"){         //el req.user.id es un id que lo tengo que usar con un findone para buscar el rol del usuario en la base de datos
            next();   
        }
        else {
            res.status(403).json({
                ok : false,
                menssage : "You do not have permissions to perform this action."
            })  
        }
        
    })
}

const checkIsSameUserOrAdmin = (req, res, next) =>{        //NO TERMINADO, TENDRIA QUE PODER VERIFICAR SI ES EL MISMO USUARIO EL QUE SE QUIERE DAR DE BAJA
    User.findById(req.user.userID).exec(async (err, data) => { 
        if(err){
            res.status(400).json({
                ok : false,
                err
            })  
        }
        else if((data.rol  == "admin") || (req.user.userID == req.body.userID) || (req.user.userID == req.params.userID)){         //verifico si es admin o si es el usuario que esta logueado tratando de modificar un dato de su cuenta
            next();   
        }
        else {
            res.status(403).json({
                ok : false,
                menssage : "You do not have permissions to perform this action."
            })  
        }
        
    })
}

const verifyToken = (req, res, next) =>{
    const token = req.get("token");   
    try{   
        const user = jwt.verify(token, process.env.SECRETKEY);
        if(user){           //si existe
            req.user = user;
            next();
        }    
        else{
            res.status(401).json({
                error : "Unauthorized access"
            })
        }  
    } catch (error){
        res.status(401).json({
            error
        })
    }  
    
}

module.exports = {checkRol, verifyToken, checkIsSameUserOrAdmin};           //checkRol : checkRol