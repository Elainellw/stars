var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Duel = require("./models/duel");
//var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

mongoose.connect("mongodb://localhost/stars_battle", { useNewUrlParser: true });

var commentRoutes = require("./routes/comments"),
    duelRoutes    = require("./routes/duels"),
    indexRoutes   = require("./routes/index");

//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I don't care",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));   

app.use("/duels/:id/comments", commentRoutes);
app.use("/duels", duelRoutes);
app.use("/", indexRoutes);

app.listen("3000", function(){
    console.log(" Server has Started!");
})