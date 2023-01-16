import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../AuthContext'

const Header = ({
  children,
  listPage,
  buttonText,
  buttonFunction,
  foodItems,
}) => {
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
      <div className='flex items-center justify-between my-4'>
        <p className='text-white text-base mt-2 mb-4'>{user && user.email}</p>
        {listPage && foodItems && foodItems.length > 0 && (
          <div className='flex flex-col items-end'>
            <div className='text-white text-xl mb-1'>Total: 243 Lei</div>
            <div className='flex items-center ml-4'>
              <input
                id='pricesInput'
                type='checkbox'
                className='w-4 h-4 text-amber-300 bg-zinc-800 mt-0.5
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
              />
              <label className='text-white ml-2 text-lg' htmlFor='pricesInput'>
                Prices
              </label>
            </div>
          </div>
        )}
      </div>

      {children}
    </div>
  )
}

export default Header
