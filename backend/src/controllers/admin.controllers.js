import Lead from "../models/lead.js"

export const getLeads=async(req,res)=>{
    try {
        const allLeads=await Lead.find().sort({createdAt:-1});
        return res.status(200).json(allLeads);
    } catch (error) {
        console.error("Get Leads Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteLead=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedLead = await Lead.findByIdAndDelete(id);
        if (!deletedLead) {
            return res.status(404).json({ message: "Lead not found" });
          }
        return res.status(200).json({message:"Lead Deleted successfully"});
    } catch (error) {
        console.error("Get Leads Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateLead=async(req,res)=>{
    try {
        const {id}=req.params;
        const {status}=req.body;
        const lead=await Lead.findByIdAndUpdate(id,{status:status},{new:true});
        if(!lead) return res.status(404).json({message:"No Lead founf"});
        return res.status(200).json(lead);
    } catch (error) {
        console.error("Get Leads Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}