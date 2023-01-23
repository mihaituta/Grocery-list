import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Auth/AuthContext'
import AuthForm from '../Auth/AuthForm'

const Login = () => {
  const [email, setEmail] = useState('demo@gmail.com')
  const [password, setPassword] = useState('123123')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password!')
      }
    }
  }

  return (
    <AuthForm
      loginForm={true}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  )
}

export default Login
