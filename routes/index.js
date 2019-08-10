var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Duel   = require("../models/duel");

router.get("/", function(req, res){
    Duel.find({}, function(err, allDuels){
        if(err){
            console.log(err);
        } else{
            res.render("main", {duels:allDuels});
        }
    })
});

//============
//AUTH ROUTES
//============

//show register form
router.get("/register", function(req,res){
    res.render("register");
});

//handle sign up logic 
router.post("/register", function(req, res){
    console.log(req.body);
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/duels");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
})

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = router;