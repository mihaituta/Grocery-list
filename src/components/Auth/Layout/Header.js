import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../AuthContext'

const Header = ({ children, listPage, buttonText, buttonFunction }) => {
  const { user } = UserAuth()
  const navigate = useNavigate()

  return (
    <div className='bg-zinc-800 p-4 drop-shadow-lg sticky top-0 z-30'>
      {/*BACK BUTTON*/}
      {listPage && (
        <div
          className='flex items-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          <ArrowUturnLeftIcon className='text-amber-300 w-5 h-5' />
          <p className='text-amber-300 text-xl ml-2'>Lists</p>
        </div>
      )}

      <div className='flex flex-row items-center justify-between '>
        <h1 className='text-white text-3xl font-semibold py-2'>Grocery list</h1>
        <button
          onClick={buttonFunction}
          className='border px-6 h-11 text-lg text-amber-300 border-amber-300'
        >
          {buttonText}
        </button>
      </div>
      <p className='text-white text-base mt-2 mb-4'>{user && user.email}</p>

      {children}
    </div>
  )
}

export default Header
