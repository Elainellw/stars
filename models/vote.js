var mongoose = require("mongoose")
var voteSchema = mongoose.Schema({
    support:Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

module.exports = mongoose.model("Vote", voteSchema);