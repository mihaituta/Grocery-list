import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Auth/AuthContext'
import AuthForm from '../Auth/AuthForm'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { createUser } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use!')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak!')
      }
    }
  }

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  )
}

export default Register
