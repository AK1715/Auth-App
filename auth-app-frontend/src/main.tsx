import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Service from './pages/Service.tsx';
import About from './pages/About.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/service' element={<Service />} />
      <Route path='/about' element={<About />} />
    </Routes>
  </BrowserRouter>
)
