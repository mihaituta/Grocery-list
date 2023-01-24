import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const AuthForm = ({
  loginForm,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
}) => {
  const [showPass, setShowPass] = useState(false)

  return (
    <div className='max-w-[400px] min-h-screen bg-zinc-800 mx-auto p-4'>
      {/*APP TITLE*/}
      <h1 className='text-4xl text-white font-bold my-10 text-center'>
        Grocery List
      </h1>
      {/*REGISTER/LOGIN TITLE*/}
      <h1 className='text-2xl text-white font-bold py-2'>
        {loginForm ? 'Login' : 'Register'}
      </h1>

      {/*EMAIL*/}
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2 text-white'>
          <label className='py-2 text-lg text-white font-medium'>
            Email Address
          </label>
          <div className='relative'>
            <input
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-0 focus:ring-amber-300 text-white text-lg bg-zinc-700 p-3 w-full pl-12'
              type='email'
            />
            {/*MAIL ICON*/}
            <div className='text-amber-300 inset-y-0 flex items-center absolute left-3'>
              <EnvelopeIcon className='h-6 w-6' />
            </div>
          </div>
        </div>

        {/*PASSWORD*/}
        <div className='flex flex-col text-white py-2'>
          <label className='py-2 text-lg font-medium'>Password</label>
          <div className='relative'>
            <input
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-0 focus:ring-amber-300 bg-zinc-700 p-3 text-white text-lg w-full pl-12'
              type={!showPass ? 'password' : 'text'}
            />
            {/*LOCK ICON*/}
            <div className='inset-y-0 flex items-center absolute left-3'>
              <LockClosedIcon className='text-amber-300 h-6 w-6' />
            </div>

            {/*SHOW/HIDE PASSWORD BUTTON*/}
            <button
              type='button'
              onClick={() => {
                setShowPass(!showPass)
              }}
              className='absolute inset-y-0 right-3'
            >
              {showPass ? (
                <EyeIcon className='text-amber-300 h-6 w-6' />
              ) : (
                <EyeSlashIcon className='text-amber-300 h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {/*REDIRECT LINK*/}
        <p className='text-white mt-1'>
          {loginForm
            ? "Don't have an account yet? "
            : 'Already have an account? '}
          <Link to={loginForm ? '/register' : '/login'} className='underline'>
            {loginForm ? 'Register' : 'Login'}
          </Link>
        </p>

        {/*ERROR*/}
        {error && (
          <p className='text-red-400 font-bold text-xl mt-2'>{error}</p>
        )}

        {/*SUBMIT BUTTON*/}
        <button
          type='submit'
          className='border-0 bg-yellow-400/80 hover:bg-yellow-300/80 w-full p-4 my-5 text-white text-xl font-bold'
        >
          {loginForm ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default AuthForm
