const express=require("express");
const http=require("http");

require("dotenv").config();

//creating http based server so that can enable socket.io
const app=express();
const server=http.createServer(app);


const port=process.env.PORT || 5000;
server.listen(port,()=>{console.log(`Server started at http://localhost:${port}`);
});

app.get("/",(req,res)=>{
    res.send("Hello World , krishna is great!!")
})
