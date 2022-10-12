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
                menssage : "que hace usted aqui?"
            })  
        }
        
    })
}

const checkUserOrAdmin = (req, res, next) =>{        //NO TERMINADO, TENDRIA QUE PODER VERIFICAR SI ES EL MISMO USUARIO EL QUE SE QUIERE DAR DE BAJA
    User.findById(req.user.userID).exec(async (err, data) => { 
        if(err){
            res.status(400).json({
                ok : false,
                err
            })  
        }
        else if(data.rol  == "admin"){         //el req.user.id es un id que lo tengo que usar con un findone para buscar el rol del usuario en la base de datos
            next();   
        }
        else {
            res.status(403).json({
                ok : false,
                menssage : "que hace usted aqui?"
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

module.exports = {checkRol, verifyToken, checkUserOrAdmin};           //checkRol : checkRol