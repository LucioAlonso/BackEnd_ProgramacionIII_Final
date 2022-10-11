const jwt = require("jsonwebtoken");


const checkRol = (req, res, next) =>{        //next es el siguiente middleware
    if(req.user.id == "admin"){         //el req.user.id es un id que lo tengo que usar con un findone para buscar el rol del usuario en la base de datos
        res.status(200).json({
            ok : true,
            menssage : "puede pasar"
        }) 
    }
    res.status(403).json({
        ok : false,
        menssage : "que hace usted aqui?"
    })
}

const verifyToken = (req, res, next) =>{
    const token = req.get("token");   
    try{
        console.log(token)        
        const user = jwt.verify(token, process.env.SECRETKEY);
        console.log(user)
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

module.exports = {checkRol, verifyToken};           //checkRol : checkRol