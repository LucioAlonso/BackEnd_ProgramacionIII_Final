const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require("./routes/index"));


const mongodb = "mongodb://localhost:27017/Municipios"
mongoose.connect(mongodb,{}, (err) => {
    if(err){
        console.error("Ocurrio un error " + err);
    }else{
        console.log("Conexion exitosa");
    }
})


app.listen(port, () =>{
    console.log(`Escuchando en el puerto ${port}`);
});
