const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: String,              
    password: String,
    rol: String
})

userSchema.virtual("getRol").get(function () {
    return this.rol;
})


const User = mongoose.model("users", userSchema);

module.exports = User;