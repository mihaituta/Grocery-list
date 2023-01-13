import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../auth/AuthContext'

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
    } catch (e) {
      setError(e.message)
      console.log(error)
      console.log(e.message)
    }
  }

  return (
    <div className='max-w-[700px] min-h-screen bg-zinc-800 mx-auto py-32 p-4'>
      <div>
        <h1 className='text-2xl dark:text-white font-bold py-2'>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 dark:text-white font-medium'>
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-0 text-white bg-zinc-700 p-3'
            type='email'
          />
        </div>
        <div className='flex dark:text-white flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-0 bg-zinc-700 p-3 text-white'
            type='password'
          />
        </div>
        <p className='py-2  text-white'>
          Don't have an account yet?{' '}
          <Link to='/register' className='underline'>
            Register
          </Link>
        </p>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
