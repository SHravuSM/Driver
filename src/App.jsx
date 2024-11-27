import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import Driver from './components/Driver';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/driver/:driver' element={<Driver />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div >
  )
}
