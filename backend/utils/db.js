const {connect}=require("mongoose");

const connectDb=async()=>{
    try{
       await connect(process.env.MONGO_URI);
       console.log("Connected to Database"); 
    }
    catch(error){
        console.log("Error connecting the Database",error.message);
    }  
}

module.exports=connectDb;