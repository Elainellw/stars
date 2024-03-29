var express= require("express");
var router = express.Router();
var Duel   = require("../models/duel");

router.get("/", function(req, res){
    // get all  duels from db
    Duel.find({}, function(err, allDuels){
        if(err){
            console.log(err);
        } else{
            console.log("find Duels: " + allDuels);
            res.render("duels/index", {duels:allDuels, currentUser: req.user});
        }
    })
    // res.render("duels", {duels});
});

router.post("/", isLoggedIn, function(req, res){
//get data from user submitted form and add it to duels array
    var name1 = req.body.name1;
    var name2 = req.body.name2;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var author = {
        id: req.user._id,
        username: req.user.username
    } ;
    var newDuel = {name1:name1, name2:name2, img1:img1, img2:img2, vote1:0, vote2:0, author:author};
    Duel.create(newDuel, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/duels");
        }
    });
});

router.get("/new", isLoggedIn,function(req, res){
    res.render("duels/new");
});

router.get("/:id", function(req, res){
    Duel.findById(req.params.id,).populate("comments").populate("votes").exec(function(err, foundDuel){
        if(err){
            console.log(err);
        }else{
            console.log(foundDuel);
            var support1 = 0;
            var support2 = 0;
            foundDuel.votes.forEach(function(vote){
                console.log(vote.support);
                if(vote.support === 1){
                    support1++;
                }else{
                    support2++;
                }
            });
            var rate1 = support1/(support1+support2)*100;
            var rate2 = support2/(support1+support2)*100;
            console.log("support1: "+ support1);
            console.log("support2: "+ support2);
            console.log("rate1: "+ rate1);
            console.log("rate2: "+ rate2);
            res.render("duels/show", {duel:foundDuel, rate1: rate1, rate2: rate2, support1: support1, support2: support2});
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