const mongoose = require("mongoose");
const ClaimsTypeSchema = new mongoose.Schema({
    type : String,
}, {
    versionKey: false
})

const ClaimsType = mongoose.model("ClaimsType", ClaimsTypeSchema);

module.exports = ClaimsType;