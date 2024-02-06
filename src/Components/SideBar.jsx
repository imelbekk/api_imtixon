import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function SideBar() {
  const [links, setLinks] = useState([
    {id: 1, path: '/books', title: 'Books'},
    {id: 2, path: '/authors', title: 'Authors'},
    {id: 3, path: '/categories', title: 'Categories'},
  ])
  return (
    <div className='w-[20%]  bg-[#1c2e4a] text-white h-[100vh] sticky top-0'>
      <ul className='flex flex-col w-[100%] items-center justify-center h-[100%] gap-[15%] '>
      {
        links.map((item, index)=>{
          return <li className='w-[100%] flex my-[]' key={index}>
            <Link className='border inline-block w-[70%] m-auto text-center px-[10px] py-[10px] rounded-[5px]' to={item.path}>{item.title} </Link>
          </li>
        })
      }
      </ul>
    </div>
  )
}
