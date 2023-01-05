import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../auth/AuthContext'

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
    } catch (e) {
      setError(e.message)
      console.log(error)
      console.log(e.message)
    }
  }

  return (
    <div className='max-w-[700px] min-h-screen bg-zinc-800 mx-auto py-16 p-4'>
      <div>
        <h1 className='text-2xl dark:text-white font-bold py-2'>Register</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 dark:text-white font-medium'>
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='border-0 text-white bg-zinc-700 p-3'
            type='email'
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 dark:text-white font-medium'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border-0 text-white bg-zinc-700 p-3 '
            type='password'
          />
        </div>
        <p className='py-2 dark:text-white'>
          Already have an account?{' '}
          <Link to='/login' className='underline'>
            Login.
          </Link>
        </p>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
