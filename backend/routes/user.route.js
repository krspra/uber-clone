const express=require("express");
const router=express.Router();
const {Signup,Login,ManageRefreshtoken,Logout}=require("../controller/user.controller")

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/refreshtoken",ManageRefreshtoken);
router.post("/logout",Logout);

module.exports=router;