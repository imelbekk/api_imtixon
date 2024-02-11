import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/SideBar";
import BooksModal from "./BooksModal";
import useBooksStore from "../../../store/books";

export default function Books() {
  const {books, getBooks} = useBooksStore()
  const {deleteBook} = useBooksStore()
  const [open, setOpen] = useState(false);
  const [edit,setEdit] = useState('')
  useEffect(()=>{
    getBooks()
  },[])
  const deletBook = (id)=>{
    deleteBook(id)
  }
  const openEditModal=(item)=>{
    setOpen(true)
    setEdit(item)
  }
  const toggle=()=>{
    setOpen(false)
    setEdit('')
  }
  return (
    <div className="w-[100%] flex">
      <SideBar />
      <BooksModal open={open} toggle={toggle} edit={edit}/>
      <div className="w-[80%] flex flex-col py-[20px] px-[20px] ">
        <div className="w-full h-full flex  justify-center gap-[30px] flex-wrap">  
          {books?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-[270px] transform  rounded-xl h-[450px]  sm:h-300px sm:w-300px bg-white shadow-xl transition duration-300 hover:scale-105">
                <img src={item.image} alt="photo" className="w-full h-[60%] rounded-t-lg" />
                <div className="px-[10px] py-[15px] h-[40%] w-full flex flex-col gap-[20px]" >
                <div className="flex gap-[20px] px-[10px] ">
                <h6 className="bg-[#e67300] text-center text-white font-[400] text-[13px]  tracking-widest	truncate leading-[20px] uppercase rounded-[10px] w-[100px]">Code: {item.code}</h6>
                <h6 className="bg-[#00b33c] text-center text-white font-[400] text-[13px]  tracking-widest	truncate leading-[20px] uppercase rounded-[10px] w-[150px]">Author ID: {item.author_id}</h6>
                </div>
                <h1 className="text-[22px] font-[600] font-bold three relative truncate"><span className="px-1">Name: {item.name}</span></h1>
                <div className="flex w-full justify-around gap-[30px] my-[5px]">
                  <button onClick={()=>openEditModal(item)} className="w-[40%] py-[10px] bg-[#282D3C] text-white rounded-[5px]">edit</button>
                  <button className="w-[40%] py-[10px] bg-[#A2242F] text-white rounded-[5px]" onClick={()=>deletBook(item.id)}>delete</button>
                </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="border bg-[#1c2e4a] w-[200px] my-[100px] py-[10px] rounded-[10px] text-white" onClick={()=>setOpen(true)}>add book</button>
      </div>
    </div>
  );
}
