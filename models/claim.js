const mongoose = require("mongoose");
const claimSchema = new mongoose.Schema({
    _idUser: mongoose.Schema.Types.ObjectId,
    claim : String,
    createDate : Date,
    resolveDate : Date,
    category : String,
    residence : String,
    state : String
}, {
    versionKey: false
})

const Claim = mongoose.model("claim", claimSchema);

module.exports = Claim;