require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose =require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose=require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const search = require(__dirname+"/utils/binarySearch.js");
const app=express();
//MIDDLEWARES 

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

//DATABASE SETTINGS

const url ="mongodb+srv://Admin-shary:"+process.env.PASSWORD+"@conference.xphd3.mongodb.net/userDB?retryWrites=true&w=majority";
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


  const userSchema=new mongoose.Schema({
      name:String,
      password :String,
      username:String,
      googleId:String
  });
  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);
  const User = mongoose.model('User',userSchema);

//SERIALISE AND DESERIALISE USER

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//REST API'S

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/register",(req,res)=>{
    let name = req.body.username;
    name=search(name);
    User.register(
       {username:req.body.username,name:name},
        req.body.password,
        (err,user)=>{
            if(err){
                console.log(err);
            }
            passport.authenticate('local')(req,res,()=>{
                res.render("options");
            })
        }

    )
});
app.post("/login", (req, res) => {
    const userN = new User({
      username: req.body.username,
      password: req.body.password
    });

    req.login(userN, function(err) {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        passport.authenticate('local')(req,res,()=>{
          res.redirect("options/"+userN._id);
      })
      }
    });
  });

app.get("/options/:id",(req,res)=>{
    const id = req.params;
    console.log(id.id);
    if(req.isAuthenticated()){
      User.findOne({_id:id.id},(err,user)=>{
        if(err){
          console.log(err);
        } else {
          res.render("options");
        }
      })
        
    } else {
        res.redirect("/login");
    }
})
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is deployed on port 3000");
})