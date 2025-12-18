import express from "express";
import LoginUser from "../controller/login.controller.js";
import UserRegister from "../controller/register.controller.js";

const router = express.Router();


router.post("/register",UserRegister)
router.post("/login",LoginUser)

export default router;
