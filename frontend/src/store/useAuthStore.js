import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({
    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,
    isCheckingAuth:false,

    checkAuth:async()=>{
        try {
            set({isCheckingAuth:true});
            const res=await axiosInstance.post("/auth/check")
            set({authUser:res.data});
        } catch (error) {
            set({ authUser: null });
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    login:async(data)=>{
        try {
            set({isLoggingIn:true});
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Sign In Successfull");
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }finally{
            set({isLoggingIn:false})
        }
    },

    signup:async(data)=>{
        try {
            set({isSigningUp:true});
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Sign Up Successfull");
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }finally{
            set({isSigningUp:false})
        }
    },

    logout: async () => {
        set({isLoggingOut:true})
        try {
          const res = await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logout Success");
        } catch (error) {
          console.log(error);
        } finally {
          set({isLoggingOut:false})
        }
    },


}))