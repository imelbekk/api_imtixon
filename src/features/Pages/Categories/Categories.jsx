import React, { useEffect } from 'react'
import SideBar from '../../../Components/SideBar'
import { useState } from 'react';
import CategoriesModal from './CategoriesModal';
import moment from 'moment';
import useCategoriesStore from '../../../store/categories';

export default function Categories() {
  const {categories, getCategories} = useCategoriesStore()
  const {deleteCategories} = useCategoriesStore()
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState('')
  useEffect(()=>{
    getCategories()
  },[])
  const deleteCt = (id)=>{
    deleteCategories(id)
  }
  const editModal = (item)=>{
    setOpen(true)
    setEdit(item)
  }
  const toggle = ()=>{
    setOpen(false)
    setEdit('')
  }
  return (
    <div className='w-[100%] flex'>
      <SideBar/>
      <CategoriesModal open={open} toggle={toggle} edit={edit}/>
      <div className='w-[80%] py-[20px] px-[20px]'> 
      <div className='flex  gap-[35px] flex-wrap  justify-center'>
        {
          categories?.map((item,index)=>{
            let createdAt = moment(item.createdAt).format('DD/MM/YYYY')
            let updatedAt = moment(item.updatedAt).format('DD/MM/YYYY')
            return <div className='  flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-[250px] transform  rounded-xl h-[200px]  sm:h-300px sm:w-300px bg-white shadow-xl transition duration-300 hover:scale-105' key={index}>
              <h6 className='text-[20px]  truncate text-center  text-[#2b2b2b] font-bold w-[80%] mx-auto my-[20px] '>Name: <span>{item.name}</span></h6>
              <p className='text-center font-[600]'>Created At: {createdAt}</p>
              <p className='text-center font-[600] my-[5px]'>Updated At: {updatedAt}</p>
              <div className='flex gap-[30px] justify-center my-[5px]'>
                <button className="w-[40%] py-[10px] bg-[#282D3C] text-white rounded-[5px]" onClick={()=>editModal(item)}>edit</button>
                <button className="w-[40%] py-[10px] bg-[#A2242F] text-white rounded-[5px]" onClick={()=>deleteCt(item.id)}>delete</button>
              </div>
            </div>
          })
        }
      </div>
        <button className="border bg-[#1c2e4a] w-[200px] my-[100px] py-[10px] rounded-[10px] text-white" onClick={()=>setOpen(true)}>add author</button>
      </div>
    </div>
  )
}
