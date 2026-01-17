import express from "express";
import { deleteLead, getLeads, updateLead } from "../controllers/admin.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const router=express.Router();

router.get("/getAllLeads",protectedRoute,getLeads)
router.delete("/deleteLead/:id",protectedRoute,deleteLead)
router.put("/updateLead/:id",protectedRoute,updateLead)

export default router;