var mongoose = require("mongoose");
var Duel = require("./models/duel");
var Comment = require("./models/comment");

// var data = [
//     {
//         name1:"Garfield",
//         name2:"Jesse",
//         img1:"https://i1.wp.com/celebrityinside.com/wp-content/uploads/2017/12/Actor-Andrew-Garfield.jpeg?resize=270%2C319",
//         img2:"https://i.pinimg.com/originals/4d/02/ba/4d02ba02d843860f9cafebf7351019e3.jpg",
//     }
// ]

function seedDB(){
    //remove all duels
    Duel.deleteMany({},function(err){
        // if(err){
        //     console.log(err);
        // }else{
        //     console.log("Removed Duels!")
        //     //add a few duels
        //     data.forEach(function(seed){
        //         Duel.create(seed, function(err, duel){
        //             if (err){
        //                 console.log(err)
        //             }else{
        //                 console.log("new data added!")
        //                 Comment.create({
        //                     text:"Garfield is so cute!",
        //                     author:"nobody"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err)
        //                     }else{
        //                         duel.comments.push(comment);
        //                         duel.save();
        //                         console.log("Create new comment!");
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // }
    });
   
    //add a few comments

}

module.exports = seedDB;