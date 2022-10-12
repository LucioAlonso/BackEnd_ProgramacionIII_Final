const User = require("../models/user");
const Person = require("../models/person");
const {checkRol, verifyToken, checkUserOrAdmin} = require("../middlewares/authentication")
const {generateJWT} = require("../helpers/generator-jwt");
const {createUserAndPerson, createUser, createPerson} = require("../helpers/auxiliaryFunctions");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const app = express();

app.post("/user/register", async (req, res) => {
    const [user, person] = createUserAndPerson(req);
    if(!(await User.findOne({userName : user.userName}))){
        let result = await user.save();  
        await person.save();  
        res.status(200).json({
            res:"ok",
            UserAdd: result
        });
    } else {
        res.status(500).json({
            err : "A user with that name already exists"
        })
    } 
})

app.post("/user/login", (req, res) => {
    const user = createUser(req);
    User.findOne({userName : user.userName, state : "enabled"} ).exec(async (err, data) => {
        if(err){
            res.status(500).json({
                res:"fail",
                err
            });
        } else if(!data){
            res.status(400).json({
                res:"fail",
                error: "The username or password entered is invalid"
            }); 
        } else if (bcrypt.compareSync(user.password, data.password)){
            console.log(data._id)
            const token = await generateJWT(data._id);
            res.status(200).json({
                user,
                token
            })
        } 
    })
})

app.post("/user/disabled", [verifyToken, checkRol],(req, res) => {
    User.findById(req.body.userID).exec(async (err, data) => {
        console.log(data.state);
        data.state = "disabled";
        let result = await data.save();
        res.status(200).json({
            res : true,
            result
        })
    })  
})

module.exports = app;          //lo devolvemos por si otro quiere usarlo 