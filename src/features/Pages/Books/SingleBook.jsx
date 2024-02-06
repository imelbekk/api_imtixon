import React, { useEffect, useState } from 'react'
import axiosCleint from '../../../plugins/AxiosCleint'

export default function SingleBook() {
  const [books, setBooks] = useState('');
  let id = window.location.href.split("/")[4];
  console.log(id);
  useEffect(() => {
    axiosCleint.get(`/book/${id}`).then((res) => {
      setBooks(res?.data);
      console.log(books);
    }).catch(err=>{
      console.log(err);
    })
  }, []);
  return (
    <div className='flex items-center w-full h-[100vh] justify-center'>
      <div className='flex border w-[700px] p-[20px] gap-[40px]'>
        <div>
          <img src={books?.image} alt="img" className='w-[300px]'/>
        </div>
        <div className='w-[300px%] flex flex-col gap-[30px]'>
          <h1>Name: {books?.name}</h1>
          <h1>Author: {books?.author?.full_name}</h1>
          <h3>Price: {books?.price}</h3>
          <h4>Code: {books?.code}</h4>
          <h6>Janr: {books?.janr.name}</h6>
          <p>Description: {books?.description}</p>
        </div>
      </div>
  </div>
  )
}
