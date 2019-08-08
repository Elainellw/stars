var express= require("express");
var router = express.Router({mergeParams: true});
var Duel = require("../models/duel")
var Comment = require("../models/comment")
//==========
//comments route
//===========
router.get("/new", isLoggedIn, function(req, res){
    //find duel by id
    Duel.findById(req.params.id, function(err, duel){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {duel: duel});
        }
    })
})

router.post("/", isLoggedIn, function(req, res){
    Duel.findById(req.params.id, function(err, duel){
        if(err){
            console.log(err);
            redirect("/duels");
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    console.log("req.user: " + req.user);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    duel.comments.push(comment);
                    duel.save();
                    console.log(comment);
                    res.redirect("/duels/"+duel._id);
                }
            });
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