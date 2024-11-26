import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const { SignInWithGoogle } = useAuth();
  return (
    <div>
      <button onClick={SignInWithGoogle}>Continue With Google</button>
    </div>
  )
}
