import React, { useEffect } from 'react'
import SideBar from '../../../Components/SideBar'
import { useState } from 'react';
import axiosCleint from '../../../plugins/AxiosCleint';
import CategoriesModal from './CategoriesModal';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState()
  const [edit, setEdit] = useState('')
  useEffect(()=>{
    axiosCleint.get('/category/get/all')
    .then((res) => {
      setCategories(res?.data);
    })
  },[])
  const editModal = (item)=>{
    setOpen(true)
    setEdit(item)
  }
  const toggle = ()=>{
    setOpen(false)
    setEdit('')
  }
  const deleteCt = (id)=>{
    axiosCleint
    .delete(`/category/delete/${id}`)
    .then((res)=>{
      if(res?.status === 200){
        window.location.reload()
      }
    })
  }
  return (
    <div className='w-[100%] flex'>
      <SideBar/>
      <CategoriesModal open={open} toggle={toggle} edit={edit}/>
      <div className='w-[80%] py-[20px] px-[20px]'> 
      <div className='flex  gap-[35px] flex-wrap  '>
        {
          categories?.map((item,index)=>{
            return <div className='flex flex-col gap-[10px]' key={index}>
              <h6 className='bg-[yellow] text-center text-[#2b2b2b] font-[600]'>{item.name}</h6>
              <p>createdAt: {item.createdAt}</p>
              <p>updatedAt: {item.updatedAt}</p>
              <div className='flex gap-[30px]'>
                <button className="w-[40%] py-[10px] bg-[#282D3C] text-white rounded-[5px]" onClick={()=>editModal(item)}>edit</button>
                <button className="w-[40%] py-[10px] bg-[#A2242F] text-white rounded-[5px]" onClick={()=>deleteCt(item.id)}>delete</button>
              </div>
            </div>
          })
        }
      </div>
        <button className="border bg-[#34568B] w-[200px] my-[100px] py-[10px] rounded-[10px] text-white" onClick={()=>setOpen(true)}>add author</button>
      </div>
    </div>
  )
}
