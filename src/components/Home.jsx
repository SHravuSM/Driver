import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <h1>Welcome to Vihar</h1>
      <NavLink to='/signin'>SignIn</NavLink>
    </div>
  )
}
