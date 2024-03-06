const express = require("express");
const userRouter = express.Router();
const {
  getAllUser,
  signUp,
  signIn,
  updateProfile,
} = require("../controllers/user-controller");

userRouter.get("/", getAllUser);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/profile", updateProfile);
module.exports = userRouter;
