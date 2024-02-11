import { create } from "zustand";
import axiosCleint from "../plugins/AxiosCleint";

const useCategoriesStore = create((set)=>({
    categories: [],
    getCategories: async()=>{
        try{
            const res = await axiosCleint.get("/category/get/all")
            set({categories: res.data})
        } catch(err){
            console.error(err);
        }
    },
    deleteCategories: async (id)=>{
        try{ 
            const res = await axiosCleint.delete(`/category/delete/${id}`).then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        }catch(err){
            console.error(err);
        }
    },
    postCategories: async (payload)=>{
        try{
            const res = await axiosCleint.post("/category/create", payload).then((res)=>{
                if(res?.status === 201){
                    window.location.reload()
                }
            })
        } catch (err){
            console.error(err);
        }
    },
    updateCategories: async (edit,payload)=>{
        try{
            const res = axiosCleint.patch(`/category/update/${edit.id}`, payload).then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        } catch(err){
            console.error(err);
        }
    }
}))

export default useCategoriesStore