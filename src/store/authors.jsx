import { create } from "zustand";
import axiosCleint from "../plugins/AxiosCleint";

const useAuthorsStore = create((set)=>({
    authors:[],
    getAuthors: async()=>{
        try{
            const res = await axiosCleint.get("/author")
            set({authors: res.data})
        } catch(err){
            console.error(err);
        }
    },
    deleteAuthor: async (id)=>{
        try{ 
            const res = await axiosCleint.delete(`/author/${id}`).then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        }catch(err){
            console.error(err);
        }
    },
    postAuthor: async (payload)=>{
        try{
            const res = await axiosCleint.post("/author", payload).then((res)=>{
                if(res?.status === 201){
                    window.location.reload()
                }
            })
        } catch (err){
            console.error(err);
        }
    },
    updateAuthor: async (edit,payload)=>{
        try{
            const res = axiosCleint.patch(`/author/${edit.id}`, payload).then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        } catch(err){
            console.error(err);
        }
    }
}))

export default useAuthorsStore