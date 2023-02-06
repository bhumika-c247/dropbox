import { Route, Routes } from "react-router-dom";
import React from 'react';
import { Login } from './components/Login';
import Header from './components/Header';


export const Allroutes = () => {
  return (
    
     <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/upload" element={<Header/>} />
    </Routes>
  
  )
}
