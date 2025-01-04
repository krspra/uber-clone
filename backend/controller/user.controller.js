const userModel = require("../models/user.model");

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user instance with the provided data
    const user = new userModel({ username, email, password });

    // Validate the user instance
    await user.validate();

    // Hash the password after validation
    user.password = await userModel.hashPassword(password);

    //creating tokens
    const Refreshtoken = user.generateRefreshToken();
    const token = user.generateAuthToken();

    user.refreshtoken = Refreshtoken;

    // Save the validated and updated user to the database
    await user.save();

    return res
      .cookie("refreshtoken", Refreshtoken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .status(200)
      .json({
        message: "User created successfully",
        success: true,
        token,
      });
  } catch (err) {
    // Handle validation errors
    if (err.name === "ValidationError") {
      const validationResult = {};
      for (let key in err.errors) {
        validationResult[key] = err.errors[key].message;
      }
      return res.status(400).json({
        message: validationResult,
        success: false,
      });
    }

    //this one is for unique email id , because this error don't come under ValidationError
    else if(err.name==="MongooseError"){
      return res.status(400).json({
        message:err.message,
        success:false
      })
    }
    // Handle other errors
    return res.status(500).json({
      message: "An unexpected error occurred",
      success: false,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        user,
      });
    }

    // Compare the password
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const Refreshtoken = user.generateRefreshToken();
    const token = user.generateAuthToken();

    user.refreshToken = Refreshtoken;
    await user.save();

    return res
      .cookie("refreshtoken", Refreshtoken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        success: true,
        token,
      });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      message: error.message || "An unexpected error occurred",
      success: false,
    });
  }
};

const Logout=async(req,res)=>{
  try {
    const {refreshToken}=req.cookies;
    await userModel.updateOne({refreshToken},{$unset:{refreshToken:""}});

    return res.clearCookie("refreshToken").json({message:"Logout successfully",success:true});
  } catch (error) {
    return res.status(500).json({message:"unable to logout",success:false})
  }
}

const getUserProfile=(req,res)=>{
  const user=req.user;
  return res.status(200).json({user,success:true})
}

module.exports = { Signup, Login,Logout,getUserProfile};
