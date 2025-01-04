const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    minLength: [2, "name should be atleast of 2 characters"],
  },
  email: {
    type: String,
    unique:[true,"email already registered"],
    required: [true,"email is required"],
    minLength: [5, "email should be atleast of 5 characters"],
    match: [
      /^[a-zA-Z0-9+-_.%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter a valid Email",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [5, "Password must be at least 5 characters long"],
    select: false, // To exclude password by default
  },
  socketId: {
    type: String,
  },
  refreshtoken: String,
});

userSchema.methods.generateAuthToken = function () {
  const authToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15min",
  });
  return authToken;
};
userSchema.methods.comparePassword = async function (passwordByUser) {
  return await bcryptjs.compare(passwordByUser, this.password);
};
userSchema.statics.hashPassword = async function (passwordByUser) {
  return await bcryptjs.hash(passwordByUser, 10);
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_KEY, {expiresIn:"7d"});
};


const userModel = model("user", userSchema);

module.exports = userModel;
