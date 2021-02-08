require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose =require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const app=express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:   "http://localhost:3000/auth/google/options",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
mongoose.connect("mongodb+srv://Admin-shary:"+process.env.PASSWORD+"@conference.xphd3.mongodb.net/userDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
   }
);
mongoose.set("useCreateIndex", true);

const userSchema=new mongoose.Schema({
    password:String,
    email:String,
    googleId:String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.get('/auth/google/optionss',
  passport.authenticate('google', {
    failureRedirect: '/authentication',
  }),
  function(req, res) {
    res.redirect('/options');
  });

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/authentication",(req,res)=>{
    res.render("login");
});
app.get("/options",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("options");
    }
})
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is deployed on port 3000");
})