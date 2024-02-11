import { create } from "zustand";
import axiosCleint from "../plugins/AxiosCleint";

const useBooksStore = create((set)=>({
    books: [],
    getBooks: async ()=>{
        try {
            const res = await axiosCleint.get("/book").then((res)=>{
            set({books: res.data})
            })
        }catch(err){
            console.log(err);
        }
    },
    postBook: async (payload)=>{
        try{
            const res = await axiosCleint.post("/book/create", payload).then((res)=>{
                if(res?.status === 201){
                    window.location.reload()
                }
            })
        } catch (err){
            console.error(err);
        }
    },
    deleteBook: async (id)=>{
        try{
            const res = await axiosCleint.delete(`/book/${id}`).then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        }catch (err){
            console.log(err);
        }
    },
    updateBooks: async (edit,payload)=>{
        try {
            const res = await axiosCleint.patch(`/book/${edit.id}`, payload).then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        }catch (err){
            console.error(err);
        }
    }
}))

export default useBooksStore