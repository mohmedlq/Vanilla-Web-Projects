import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import CheckOut from './Pages/CheckOut';
import NavBar from './Components/NavBar';
import "./App.css"
export default function App() {
return(
  <div className='app'>
    <NavBar/>
      <Routes>
        
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>

      </Routes>


  </div>
)
}