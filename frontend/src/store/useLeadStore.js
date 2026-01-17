import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useLeadStore=create((set)=>({
    isAddingLead:false,

    addLead:async(data)=>{
        try {
            set({isAddingLead:true});
            await axiosInstance.post("/leads",data)
            toast.success("Your Enquiry is Submitted successfully")
        } catch (error) {
        }
        finally{
            set({isAddingLead:false})

        }
    }
}))