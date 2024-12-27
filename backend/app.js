const express=require("express");
const cors=require("cors");

const app=express();
const corsOptions={};
app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("Hello World , krishna is great!!")
})

module.exports=app;