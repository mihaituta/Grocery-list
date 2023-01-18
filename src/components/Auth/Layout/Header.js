import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../AuthContext'
import { useState } from 'react'

const Header = ({
  children,
  listPage,
  buttonText,
  buttonFunction,
  foodItems,
  currentList,
  listsCtx,
}) => {
  const { user } = UserAuth()
  const navigate = useNavigate()
  const [val, changeVal] = useState('')

  const togglePrices = () => {
    // listCtx.toggleListPrices(currentList)
    listsCtx.updateList({
      togglePrices: currentList.togglePrices,
      listId: currentList.id,
    })
  }

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
        {/*TOTAL PRICE */}
        {listPage && foodItems && foodItems.length > 0 && (
          <div className='flex flex-col items-end'>
            <div className='text-white text-xl mb-1'>
              Total:
              <input
                style={{
                  width: `${Math.min(Math.max(val.length, 2), 10) + 2}ch`,
                }}
                value={val}
                onChange={(e) => {
                  changeVal(e.target.value)
                }}
                type='number'
                placeholder='0'
                className='disabled:cursor-not-allowed appearance-none text-center bg-neutral-900 text-zinc-300 text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded h-8 mx-2 p-0'
              />
              lei
            </div>
            {/*TOGGLE PRICES*/}
            <div className='flex items-center ml-4 mt-2'>
              <input
                type='checkbox'
                checked={currentList.togglePrices}
                onChange={togglePrices}
                id='pricesInput'
                className='w-5 h-5 text-amber-300 bg-zinc-800 focus:ring-offset-0
                border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
              />
              <label className='text-white ml-2 text-lg' htmlFor='pricesInput'>
                Empty prices
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
