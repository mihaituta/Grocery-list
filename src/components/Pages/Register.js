import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Auth/AuthContext'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

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
    <div className='max-w-[700px] min-h-screen bg-zinc-800 mx-auto py-32  p-4'>
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
        <div className='flex flex-col text-white py-2'>
          <label className='py-2 dark:text-white font-medium'>Password</label>
          <div className='relative'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='border-0 text-white bg-zinc-700 p-3 w-full'
              type={!showPass ? 'password' : 'text'}
            />
            <button
              type='button'
              onClick={() => {
                setShowPass(!showPass)
              }}
              className='absolute inset-y-0 right-3'
            >
              {!showPass ? (
                <EyeIcon className='h-6 w-6' />
              ) : (
                <EyeSlashIcon className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
        <p className='py-2 text-white'>
          Already have an account?{' '}
          <Link to='/login' className='underline'>
            Login
          </Link>
        </p>
        <button
          type='submit'
          className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
