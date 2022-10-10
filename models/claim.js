const mongoose = require("mongoose");
const claimSchema = new mongoose.Schema({
    _idUser: mongoose.Schema.Types.ObjectId,
    userName : String,
    createDate : Date,
    resolveDate : Date,
    category : String,
    residence : String,
})

const Claim = mongoose.model("claim", claimSchema);

module.exports = Claim;