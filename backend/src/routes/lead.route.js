import express from "express";
import { lead } from "../controllers/lead.controllers.js";
const router=express.Router();

router.post("/",lead)

export default router;