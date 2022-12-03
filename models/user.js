const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: String,              
    password: String,
    rol: String,
    state : String
})

userSchema.virtual("getRol").get(function () {
    return this.rol;
}, {
    versionKey: false
})


const User = mongoose.model("users", userSchema);

module.exports = User;