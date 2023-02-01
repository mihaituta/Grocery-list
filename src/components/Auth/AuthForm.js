import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

const AuthForm = ({
  loginForm,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}) => {
  const [showPass, setShowPass] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPassEmpty, setIsPassEmpty] = useState(false)
  const emailInputRef = useRef()
  const passInputRef = useRef()

  const validateInputs = (e) => {
    e.preventDefault()
    if (!email.trim()) setIsEmailEmpty(true)
    if (email.includes('@')) setIsEmailValid(true)

    if (!password.trim()) setIsPassEmpty(true)
    emailInputRef.current.blur()
    passInputRef.current.blur()

    //if neither email nor password are empty and email is valid proceed to submit
    if (email.trim() && password.trim() && email.includes('@')) handleSubmit(e)
  }

  const errorHandler = (error) => {
    return (
      <>
        {error && (
          <div className='flex items-center mt-2'>
            <ExclamationTriangleIcon className='text-red-500 w-5 h-5' />
            <span className='ml-2 text-red-500 font-bold text-[17px]'>
              {error}
            </span>
          </div>
        )}
      </>
    )
  }

  const passwordEyeStyle = `text-amber-300 h-6 w-6 ${
    isPassEmpty ? 'text-red-500' : 'text-amber-300'
  }`

  return (
    <div className='max-w-[400px] min-h-screen bg-zinc-800 mx-auto p-4'>
      {/*APP TITLE*/}
      <h1 className='text-4xl text-white font-bold my-10 text-center'>
        Grocery List
      </h1>

      {/*ERROR*/}
      {error && (
        <div className='flex items-center justify-center mb-5 bg-red-500 py-2.5 rounded'>
          <ExclamationTriangleIcon className='text-white w-7 h-7' />
          <p className='text-white font-semibold text-xl ml-2'>{error}</p>
        </div>
      )}

      {/*REGISTER/LOGIN TITLE*/}
      <h1 className='text-2xl text-white font-bold py-2'>
        {loginForm ? 'Login' : 'Register'}
      </h1>

      {/*EMAIL*/}
      <form autoComplete='on' onSubmit={(e) => validateInputs(e)}>
        <div className='flex flex-col py-1 text-white'>
          <label className='py-2 text-lg text-white font-semibold'>
            Email Address
          </label>
          <div className='relative'>
            <input
              ref={emailInputRef}
              autoComplete='on'
              type='text'
              value={email}
              autoCapitalize='none'
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
                e.target.value.trim()
                  ? setIsEmailEmpty(false)
                  : setIsEmailEmpty(true)
                // email has to be a correct email format
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                regex.test(e.target.value.trim())
                  ? setIsEmailValid(true)
                  : setIsEmailValid(false)
              }}
              placeholder='Email'
              className={`border-0 focus:ring-amber-300 focus:ring-2 text-white placeholder-neutral-500 text-lg bg-zinc-700
               p-3 w-full pl-12 ${
                 isEmailEmpty || !isEmailValid
                   ? 'focus:ring-red-500 ring-red-500 ring-2'
                   : 'focus:ring-amber-300'
               }`}
            />
            {/*MAIL ICON*/}
            <div
              className={`${
                isEmailEmpty || !isEmailValid
                  ? 'text-red-500'
                  : 'text-amber-300'
              } inset-y-0 flex items-center absolute left-3`}
            >
              <EnvelopeIcon className='h-6 w-6' />
            </div>
          </div>

          {/*EMAIL EMPTY ERROR*/}
          {errorHandler(
            isEmailEmpty
              ? 'Email field cannot be empty!'
              : !isEmailValid
              ? 'Incorrect email address format!'
              : ''
          )}
        </div>

        {/*PASSWORD*/}
        <div className='flex flex-col text-white py-1'>
          <label className='py-2 text-lg font-semibold'>Password</label>
          <div className='relative'>
            <input
              // required={true}
              ref={passInputRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
                e.target.value.trim()
                  ? setIsPassEmpty(false)
                  : setIsPassEmpty(true)
              }}
              placeholder='Password'
              className={`border-0 focus:ring-amber-300 focus:ring-2 bg-zinc-700 placeholder-neutral-500 p-3 
              text-white text-lg w-full pl-12 ${
                isPassEmpty
                  ? 'focus:ring-red-500 ring-2 ring-red-500'
                  : 'focus:ring-amber-300'
              }`}
              type={!showPass ? 'password' : 'text'}
            />
            {/*LOCK ICON*/}
            <div className='inset-y-0 flex items-center absolute left-3'>
              <LockClosedIcon className={passwordEyeStyle} />
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
                <EyeIcon className={passwordEyeStyle} />
              ) : (
                <EyeSlashIcon className={passwordEyeStyle} />
              )}
            </button>
          </div>
          {/*PASSWORD EMPTY ERROR*/}
          {errorHandler(isPassEmpty ? 'Password field cannot be empty!' : '')}
        </div>

        {/*REDIRECT LINK*/}
        <p className='text-white text-[17px] mt-1'>
          {loginForm
            ? "Don't have an account yet? "
            : 'Already have an account? '}
          <Link to={loginForm ? '/register' : '/login'} className='underline'>
            {loginForm ? 'Register' : 'Login'}
          </Link>
        </p>

        {/*SUBMIT BUTTON*/}
        <button
          type='submit'
          className='border-0 bg-yellow-400/90 hover:bg-yellow-400 w-full p-4 my-5 text-white text-xl font-bold'
        >
          {loginForm ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default AuthForm
