const express=require("express");
const router=express.Router();
const {Signup,Login,Logout,getUserProfile}=require("../controller/captain.controller");
const {authCaptain}=require("../middlewares/auth.middleware")

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.get("/profile",authCaptain,getUserProfile);

module.exports=router;