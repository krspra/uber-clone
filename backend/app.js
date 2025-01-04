const express=require("express");
const cors=require("cors");
const userRouter=require("./routes/user.route");
const captainRouter=require("./routes/captain.route");
const cookieParser=require("cookie-parser");

const app=express();
const corsOptions={};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("Hello World , krishna is great!!")
})

app.use("/api/user",userRouter);
app.use("/api/captain",captainRouter);
module.exports=app;