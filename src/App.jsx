import React from 'react'
import Auth from './features/Auth/Auth'
import SignIn from './features/Auth/SignIn'
import SignUp from './features/Auth/SignUp'
import { Route, Routes } from 'react-router-dom'
import Books from './features/Pages/Books/Books'
import Authors from './features/Pages/Authors/Authors'
import Categories from  './features/Pages/Categories/Categories'
import SingleBook from './features/Pages/Books/SingleBook'
import SingleAuthor from './features/Pages/Authors/SingleAuthor'

export default function App() {
  return (
    <>
    <h1>hello</h1>
      <Routes>
        <Route path='' element={<Auth/>}/>
        <Route path='/sign_up' element={<SignUp/>}/>
        <Route path='/sign_in' element={<SignIn/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/authors' element={<Authors/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path="single_book/:id" element={<SingleBook/>}/>
        <Route path="single_author/:id" element={<SingleAuthor/>}/>
      </Routes>
    </>
  )
}
