const captainModel = require("../models/captain.model");

const Signup = async (req, res) => {
  try {
    const { captainname, email, password, vehicle } = req.body;

    // Create a new user instance with the provided data
    const captain = new captainModel({
      captainname,
      email,
      password,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });

    // Validate the user instance
    await captain.validate();

    // Hash the password after validation
    captain.password = await captainModel.hashPassword(password);

    //creating tokens
    const Refreshtoken = captain.generateRefreshToken();
    const token = captain.generateAuthToken();

    captain.refreshtoken = Refreshtoken;

    // Save the validated and updated user to the database
    await captain.save();

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
    else if (err.name === "MongooseError") {
      return res.status(400).json({
        message: err.message,
        success: false,
      });
    }
    // Handle other errors
    return res.status(500).json({
      message: "An unexpected error occurred",
      error: err.message,
      success: false,
    });
  }
};

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
          success: false,
        });
      }
  
      const captain = await captainModel.findOne({ email }).select("+password");
      if (!captain) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }
  
      const passwordMatch = await captain.comparePassword(password);
      if (!passwordMatch) {
        return res.status(400).json({
          message: "Incorrect password",
          success: false,
        });
      }
  
      const Refreshtoken = await captain.generateRefreshToken();
      const token = await captain.generateAuthToken();
  
      if (!Refreshtoken || !token) throw new Error("Token generation failed");
  
      captain.refreshToken = Refreshtoken;
      await captain.save();
  
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
      return res.status(500).json({
        message: error.message || "An unexpected error occurred",
        success: false,
      });
    }
  };  

const Logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    await captainModel.updateOne(
      { refreshToken },
      { $unset: { refreshToken: "" } }
    );

    return res
      .clearCookie("refreshToken")
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to logout", success: false });
  }
};

const getUserProfile = (req, res) => {
  const captain = req.captain;
  return res.status(200).json({ captain, success: true });
};

module.exports = { Signup,Login, Logout, getUserProfile };
