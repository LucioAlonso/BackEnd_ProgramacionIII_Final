const jwt = require("jsonwebtoken");

const generateJWT = (userID) => {
    return new Promise((resolve, reyect)=>{
        const payload = {userID};                     //id : userID
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: process.env.TIMEEXPIRED
        }, (err, token) => {
            if(err){
                reyect(err);
            }
            else
            {
                resolve(token);
            }
        });
    });
};

module.exports = {generateJWT};