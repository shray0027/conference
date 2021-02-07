const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");

const app=express();

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/authentication",(req,res)=>{
    res.render("login");
})
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is deployed on port 3000");
})