var express= require("express");
var router = express.Router({mergeParams: true});
var Vote   = require("../models/vote");
var Duel = require("../models/duel");

router.post("/", isLoggedIn, function(req, res){
    Duel.findById(req.params.id).populate("votes").exec(function(err, findDuel){
        if(err){
            console.log(err);
        }else{
            console.log("found duel:" + findDuel);
            console.log("request body:" + req.body.vote);
            var voted = false;
            findDuel.votes.forEach(function(vote){
                if(vote.author.id.equals(req.user._id)){
                    console.log("exist!");
                    vote.support = req.body.vote;
                    vote.save();
                    voted = true;
                }
            });
            if(voted == false){
                var newVote = {
                    support: req.body.vote,
                    author:{
                        id: req.user._id,
                        username: req.user.username
                    }
                };
                Vote.create(newVote, function(err, vote){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("new vote: "+vote);
                        vote.save();
                        findDuel.votes.push(vote);
                        findDuel.save();
                        console.log("vote updated");
                    }
                });
            }
            res.redirect("/duels/"+findDuel._id);
            // if(!findDuel.votes){
            //     newVote.save();
            //     findDuel.votes.push(newVote);
            //     Duel.save();
            //     console.log("saved vote: "+ newVote);
            // }else{
            //     findDuel.findOneAndUpdate({
            //         author:{
            //             $elemMatch: {
            //                 username: req.user.username
            //             }
            //         }
            //     }, newVote, {upsert: true}).exec(function(err, vote){
            //         if(err){
            //             console.log(err);
            //         } else{
            //             console.log(vote);
            //         }
            //     });
            //}
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = router;