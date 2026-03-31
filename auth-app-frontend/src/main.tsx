import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Service from './pages/Service.tsx';
import About from './pages/About.tsx';
import RootLayout from './pages/RootLayout.tsx';
import UserLayout from './pages/users/UserLayout.tsx';
import UserHome from './pages/users/UserHome.tsx';
import UserProfile from './pages/users/UserProfile.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/service' element={<Service />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={ <UserLayout /> }>
            <Route index element={ <UserHome /> } />
            <Route path='profile' element={ <UserProfile /> } />
        </Route>
      </Route>
      
    </Routes>
  </BrowserRouter>
)
