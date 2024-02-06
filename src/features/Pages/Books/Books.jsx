import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/SideBar";
import axiosCleint from "../../../plugins/AxiosCleint";
import BooksModal from "./BooksModal";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState();
  const [open, setOpen] = useState(false);
  const [edit,setEdit] = useState('')
  useEffect(() => {
    axiosCleint.get("/book").then((res) => {
      setBooks(res?.data);
      console.log(books);
    });
  }, []);
  const deletBook = (id)=>{
    axiosCleint.delete(`/book/${id}`)
    .then((res)=>{
      if(res.status === 200){
        window.location.reload()
      }
    }).catch((err)=>{
      console.log(err);
    })
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
      <div className="w-[80%] py-[30px] px-[30px] ">
        <div className="flex gap-[100px] justify-between flex-wrap">
          {books?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-[15px]">
                <img src={item.image} alt="photo" className="w-[200px] h-[200px]" />
                <h1 className="text-[22px] font-[600]">Name: {item.name}</h1>
                <h4>Price: {item.price}$</h4>
                <h6 className="bg-[yellow] rounded-[3px]">Code: {item.code}</h6>
                <div className="flex gap-[30px]">
                  <button onClick={()=>openEditModal(item)} className="w-[40%] py-[10px] bg-[#282D3C] text-white rounded-[5px]">edit</button>
                  <button className="w-[40%] py-[10px] bg-[#A2242F] text-white rounded-[5px]" onClick={()=>deletBook(item.id)}>delete</button>
                </div>
                 <Link to={`/single_book/${item.id}`} className="w-full border text-center bg-[#DC793E] py-[5px] text-white rounded-[5px]">View Detais</Link>
              </div>
            );
          })}
        </div>
        <button className="border bg-[#34568B] w-[200px] my-[100px] py-[10px] rounded-[10px] text-white" onClick={()=>setOpen(true)}>add book</button>
      </div>
    </div>
  );
}
