import React, { useEffect, useState } from 'react'
import SideBar from '../../../Components/SideBar'
import AuthorsModal from './AuthorsModal'
import moment from 'moment'
import useAuthorsStore from '../../../store/authors'

export default function Authors() {
  const {authors, getAuthors} = useAuthorsStore()
  const {deleteAuthor} = useAuthorsStore()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState('')
  useEffect(()=>{
    getAuthors()
  },[])
  const toggle = () => {
    setOpen(false);
    setEdit("");
  };
  const editModal = (item)=>{
    setOpen(true)
    setEdit(item)
  }
  const authorDelete = (id)=>{
    deleteAuthor(id)
  }
  return (
    <div className='w-[100%] flex'>
      <SideBar/>
      <AuthorsModal open={open} toggle={toggle} edit={edit}/>
      <div className='w-[80%] flex flex-col py-[20px] px-[20px]'> 
        <div className='w-full h-full flex  justify-center gap-[30px] flex-wrap'>
          {
            authors?.map((item,index)=>{
              let birthDate = moment(item.birthdate).format('DD/MM/YYYY')
              return <div key={index} className='flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-[270px] transform  rounded-xl h-[450px]  sm:h-300px sm:w-300px bg-white shadow-xl transition duration-300 hover:scale-105'>
                <img src={item.image} alt="photo" className="w-full h-[50%] rounded-t-lg" />
                <div className="px-[10px] py-[15px] h-[50%] w-full flex flex-col gap-[20px]" >
                <h6 className="text-[22px] font-[600] font-bold three relative truncate">Name: {item.full_name}</h6>
                <p className='bg-[#98B4D4] text-[#ccccc] font-[450] rounded-[5px] flex gap-[20px] px-[10px]'><span>Birthdate:</span> {birthDate}</p>
                <p className='text-[#4459]'>Country: <span className='font-bold  truncate text-black'>{item.country}</span></p>
                <div className="flex gap-[30px]">
                  <button className="w-[40%] py-[10px] bg-[#282D3C] text-white rounded-[5px]" onClick={()=>editModal(item)}>edit</button>
                  <button className="w-[40%] py-[10px] bg-[#A2242F] text-white rounded-[5px]" onClick={()=>authorDelete(item.id)}>delete</button>
                </div>
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
