const http=require("http");
const app=require("./app");
const connectDb=require("./utils/db");

require("dotenv").config();

//creating http based server so that can enable socket.io
const server=http.createServer(app);


const port=process.env.PORT || 5000;
server.listen(port,()=>{
    connectDb();
    console.log(`Server started at http://localhost:${port}`);
});

