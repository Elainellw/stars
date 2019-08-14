//SCHEMA SETUP
var mongoose = require("mongoose");

var duelsSchema = new mongoose.Schema({
    name1:String,
    name2:String,
    img1:String,
    img2:String,
    votes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Vote"
        }
    ],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Duel", duelsSchema);