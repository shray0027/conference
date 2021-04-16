require('dotenv').config();
const http = require("http");
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose =require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose=require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const search = require(__dirname+"/utils/binarySearch.js");
const qoutes = require(__dirname+"/utils/qoutes.js");
const app=express();
const server =  http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const { ExpressPeerServer }=require("peer");
const peerServer = ExpressPeerServer(server,{
  debug:true
})
const {generateMessage} = require(__dirname+"/utils/message.js");
const {addUser,removeUser,getUser,getUsersInRoom}= require(__dirname+"/utils/users.js");
//MIDDLEWARES 

app.set("view engine","ejs");
app.use(express.static("public"));
app.use('/peerjs',peerServer);
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

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://conference-jam.herokuapp.com/auth/google/options"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ name:profile.displayName,googleId: profile.id }, function (err, user) {
        // console.log(profile);
         return done(err, user);
       });
  }
));



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
  if(req.isAuthenticated()){
    res.redirect("/options");
  } else {
    res.render("index");
  }
})
app.get("/qoutes",(req,res)=>{
  qoutes(callback=>{
      res.send(
        callback);
  });
})
app.get("/login",(req,res)=>{
  if(req.isAuthenticated()){
    res.redirect("/options");
  } else {
    res.render("login",{display:'none',message:'none'});
  }
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
                res.redirect("/options");
            })
        }

    )
});
app.post('/login', function(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (! user) {
    
     return res.render("login",{ display:'block',message : 'check username or password' }); 
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      res.redirect("/options");       
    });
  })(req, res, next);
});
  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/options', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/options');
  });
app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
})
app.get("/options",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("options",{
      initialName : req.user.name.slice(0,1)
    });
  } else {
    res.redirect("/login");
  }
  
})
app.get("/join",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("join");
  } else {
    res.redirect("/login");
  }
})

io.on('connection',(socket)=>{
  
  socket.on('join',(options,peerID,callback)=>{
    console.log(peerID);
    const {error,user} = addUser({id:socket.id,...options});
    if(error){
        return callback(error);
    }
    socket.join(user.room);
    socket.emit('message',generateMessage("chat bot","yellow","Welcome!"));
    socket.broadcast.to(user.room).emit('socket-connected',generateMessage(user.username,user.avatarColor," joined!! at "));
    socket.broadcast.to(user.room).emit('peer-connected',peerID);
    io.to(user.room).emit('roomData',{
      users:getUsersInRoom(user.room)
    })
    callback();
  })
  socket.on("message",(message,callback)=>{
    const {username,avatarColor,room} = getUser(socket.id);
    io.to(room).emit('message',generateMessage(username,avatarColor,message));
    callback();
  })
  socket.on('disconnect',()=>{
    const user = removeUser(socket.id);
    if(user){
        io.to(user.room).emit('disconnected',generateMessage(user.username,user.avatarColor," disconnected at "));
        io.to(user.room).emit('roomData',{
          users:getUsersInRoom(user.room)
        })
    }
  })
  })
app.get("/create",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("create");
  } else {
    res.redirect("/login");
  }
})
app.get("/conference",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("conference")
  } else {
    res.redirect("/login");
  }

})

app.get("/end",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("end");
  } else {
    res.redirect("/login");
  }
})
app.get("*",(req,res)=>{
  if(req.isAuthenticated()){
    res.status(404);
    res.render("404",{
      initialName : req.user.name.slice(0,1)
    });
  }else {
    res.status(404);
    res.render("404Not");
  }
});
let port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`server is deployed on port ${port}`);
})