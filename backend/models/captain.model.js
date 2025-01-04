const {model,Schema}=require("mongoose");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");

const captainSchema=new Schema({
    captainname:{
        type:String,
        required:[true,"name is required"],
        minLength:[2,"name should be atleast of 2 characters"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        match:[/^[a-zA-Z0-9+-.%_]+@[a-zA-Z0-9+-_%.]+\.[a-zA-Z]{2,}$/,"Please enter a valid email"],
        unique:[true,"email already registered"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    socketId:String,
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:[true,"color is required"],
            minLength:[2,"color should be atleast of 2 characters"]
        },
        plate:{
            type:String,
            required:[true,"plate is required"],
            unique:[true,"plate already registered"],
            minLength:[2,"plate should be atleast of 2 characters"]
        },
        capacity:{
            type:Number,
            required:[true,"capacity is required"],
            min:[1,"capacity should be atleast 1"]
        },
        vehicleType:{
            type:String,
            required:[true,"vehicle type is required"],
            enum:["bike","car","auto"]
        },
        location:{
            latitude:Number,
            longitude:Number    
        }
    },
    refreshtoken:String
});

captainSchema.methods.generateAuthToken=function(){
    const authToken=jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:"15min"})
    return authToken;
}

captainSchema.methods.generateRefreshToken=function(){
    const refreshToken=jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_KEY,{expiresIn:"7d"})
    return refreshToken;
}

captainSchema.methods.comparePassword=async function(passwordByUser){
    return await bcryptjs.compare(passwordByUser,this.password);
}
captainSchema.statics.hashPassword=async function(passwordByUser){
    return await bcryptjs.hash(passwordByUser,10);
}

const captainModel=model("captain",captainSchema);


module.exports=captainModel;