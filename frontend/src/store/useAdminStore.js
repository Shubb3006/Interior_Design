import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore=create((set)=>({
    leads:[],
    isGettingAllLeads:false,

    getAllLeads:async()=>{
        try {
            set({isGettingAllLeads:true});
            const res=await axiosInstance.get("/admin/getAllLeads");
            set({leads:res.data})
        } catch (error) {
            toast.error(error?.response?.data?.message)
            
        }finally{
            set({isGettingAllLeads:false})
        }
    },

    deleteLead:async(leadId)=>{
        try {
            const res=await axiosInstance.delete(`/admin/deleteLead/${leadId}`);
            set((state) => ({
                leads: state.leads.filter((lead) => lead._id != leadId),
            }));
            toast.success("Lead Deleted")
        } catch (error) {
            toast.error(error?.response?.data?.message)
            
        }

    },
    updateLead:async(leadId,status)=>{
        try {
            const res=await axiosInstance.put(`/admin/updateLead/${leadId}`,{status});
            set((state) => ({
                leads: state.leads.map((lead) =>
                  lead._id === leadId ? { ...lead, status } : lead
                ),
              }));
            toast.success("Lead Updated")
        } catch (error) {
              toast.error(error?.response?.data?.message)
    
        }
    }
}))