import { create } from "zustand";
import axiosCleint from "../plugins/AxiosCleint";

const useAuthStore = create(() => ({
  register: async (payload) => {
    try {
      const response = await axiosCleint.post("/auth/signup", payload)
      if(response?.data?.tokens?.access_token){
        localStorage.setItem("token", response?.data?.tokens?.access_token)
      }
    } catch (err) {
    localStorage.removeItem("token")
    }
  },
  login: async (payload) =>{
    try{
        const res = await axiosCleint.post("/auth/signin", payload)
        if(res?.data?.tokens?.access_token){
        localStorage.setItem("token", res?.data?.tokens?.access_token)
        }
    } catch (err){
        localStorage.removeItem("token")
    }
  }
}));

export default useAuthStore;
