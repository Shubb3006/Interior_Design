import express from "express";
import { check, login, logout, signUp } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const router=express.Router();

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.post("/check",protectedRoute,check)

export default router;