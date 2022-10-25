const mongoose = require("mongoose");
const ClaimsTypeSchema = new mongoose.Schema({
    type : String,
    amount : Number,
    streets : [String]
})

const ClaimsType = mongoose.model("ClaimsType", ClaimsTypeSchema);

module.exports = ClaimsType;