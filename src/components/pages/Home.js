import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Auth/AuthContext'

const items = ['Cola', 'Potato Chips', 'Pudding', 'Chocolate']

const Account = () => {
  const { user, logout } = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message)
    }
  }

  const foodItems = (
    <ul className='mt-2'>
      {items.map((item, index) => (
        <li key={index}>
          <label className='inline-flex items-center bg-zinc-500	 mt-2 p-2 w-full'>
            <input
              className='w-8 h-8 text-green-600 border-0 focus:ring-0 rounded-full'
              type='checkbox'
              id={`checkbox-${index}`}
              name={item}
            />
            <label
              className='ml-3 text-2xl font-semibold text-white'
              htmlFor={`checkbox-${index}`}
            >
              {item}
            </label>
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>

      <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>
      {foodItems}
    </div>
  )
}

export default Account
