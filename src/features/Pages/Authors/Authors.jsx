import React, { useEffect, useState } from 'react'
import SideBar from '../../../Components/SideBar'
import axiosCleint from '../../../plugins/AxiosCleint'
import AuthorsModal from './AuthorsModal'

export default function Authors() {
  const [authors, setAuthors] = useState()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState('')
  useEffect(()=>{
    axiosCleint.get('/author').then((res)=>{
      setAuthors(res?.data)
      console.log(authors);
    })
  },[])
  const toggle = () => {
    setOpen(false);
    setEdit("");
  };
  const editModal = (item)=>{
    setOpen(true)
    setEdit(item)
  }
  const deleteAuthor = (id)=>{
    axiosCleint.delete(`/author/${id}`).then((res)=>{
      if(res.status === 200){
        window.location.reload()
      }
    })
  }
  return (
    <div className='w-[100%] flex'>
      <SideBar/>
      <AuthorsModal open={open} toggle={toggle} edit={edit}/>
      <div className='w-[80%] py-[30px] px-[30px] '> 
        <div className='flex w-[100%]  justify-between flex-wrap gap-[50px]'>
          {
            authors?.map((item,index)=>{
              return <div key={index} className='w-[250px] flex flex-col gap-[20px] '>
                <img src={item.image} alt="photo" className='h-[250px]' />
                <h6>Name: {item.full_name}</h6>
                <p className='bg-[yellow] rounded-[5px]'>Birthdate: {item.birthdate}</p>
                <p>Country: {item.country}</p>
                <div className="flex gap-[30px]">
                  <button className="w-[40%] py-[10px] bg-[#282D3C] text-white rounded-[5px]" onClick={()=>editModal(item)}>edit</button>
                  <button className="w-[40%] py-[10px] bg-[#A2242F] text-white rounded-[5px]" onClick={()=>deleteAuthor(item.id)}>delete</button>
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
