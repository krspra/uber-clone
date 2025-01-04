const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");

const authUser = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Trigger refresh token logic
        const { refreshtoken } = req.cookies;
        if (!refreshtoken) {
          return res.status(401).json({ message: "Refresh token missing", success: false });
        }

        // Verify and generate new tokens
        try {
          const user = await userModel.findOne({ refreshToken: refreshtoken });
          if (!user) {
            return res.status(401).json({ message: "Invalid refresh token", success: false });
          }

          jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY, async (refreshErr, decodedRefresh) => {
            if (refreshErr) {
              return res.status(403).json({ message: "Refresh token expired", success: false });
            }

            // Generate a new access token
            const newToken = user.generateAuthToken();
            res.setHeader("Authorization", `Bearer ${newToken}`);
            req.user = user;
            next();
          });
        } catch (error) {
          return res.status(500).json({ message: error.message, success: false });
        }
      } else {
        return res.status(400).json({ message: "Invalid Token", success: false });
      }
    } else {
      const user = await userModel.findById(decoded._id);
      if (!user) {
        return res.status(401).json({ message: "User not found", success: false });
      }
      req.user = user;
      next();
    }
  });
};

const authCaptain = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Trigger refresh token logic
        const { refreshtoken } = req.cookies;
        if (!refreshtoken) {
          return res.status(401).json({ message: "Refresh token missing", success: false });
        }

        // Verify and generate new tokens
        try {
          const captain = await captainModel.findOne({ refreshToken: refreshtoken });
          if (!captain) {
            return res.status(401).json({ message: "Invalid refresh token", success: false });
          }

          jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY, async (refreshErr, decodedRefresh) => {
            if (refreshErr) {
              return res.status(403).json({ message: "Refresh token expired", success: false });
            }

            // Generate a new access token
            const newToken = captain.generateAuthToken();
            res.setHeader("Authorization", `Bearer ${newToken}`);
            req.captain = captain;
            next();
          });
        } catch (error) {
          return res.status(500).json({ message: error.message, success: false });
        }
      } else {
        return res.status(400).json({ message: "Invalid Token", success: false });
      }
    } else {
      const captain= await userModel.findById(decoded._id);
      if (!captain) {
        return res.status(401).json({ message: "User not found", success: false });
      }
      req.captain = captain;
      next();
    }
  });
};

module.exports = {authUser,authCaptain};