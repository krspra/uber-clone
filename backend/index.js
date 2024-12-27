const http=require("http");
const app=require("./app")

require("dotenv").config();

//creating http based server so that can enable socket.io
const server=http.createServer(app);


const port=process.env.PORT || 5000;
server.listen(port,()=>{console.log(`Server started at http://localhost:${port}`);
});

