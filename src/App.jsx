import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Driver from './components/Driver';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/driver' element={<Driver />} />
      </Routes>
    </div >
  )
}
