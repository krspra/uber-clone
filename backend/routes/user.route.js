const express=require("express");
const router=express.Router();
const {Signup,Login,Logout,getUserProfile}=require("../controller/user.controller");
const authUser=require("../middlewares/auth.middleware")

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Logout);
router.get("/profile",authUser,getUserProfile);

module.exports=router;