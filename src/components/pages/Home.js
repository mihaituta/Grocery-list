import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../auth/AuthContext'
import ListsContext from '../../store/ListsContext'

const items = ['Cola', 'Potato Chips', 'Pudding', 'Chocolate']

const Home = () => {
  const { user, logout } = UserAuth()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e.message)
    }
  }

  const createList = () => {
    listsCtx.addList()
  }

  /*  const foodItems = (
    <ul className='mt-2'>
      {items.map((item, index) => (
        <li key={index}>
          <label className='inline-flex items-center bg-zinc-500 mt-2 p-2 w-full'>
            <input
              className='w-8 h-8 text-green-600 focus:border-none border-none focus:ring-0 ring-0 rounded-full'
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
  )*/

  const lists = (
    <div className='grid grid-cols-2 gap-4 bg-zinc-900 m-4'>
      {items.map((item, index) => (
        <li className='h-28	bg-yellow-500 rounded list-none' key={index}></li>
      ))}
    </div>
  )

  return (
    <div className='bg-neutral-900 min-h-screen min-h-full'>
      <div className='bg-zinc-800'>
        <div className='flex flex-row justify-between p-4'>
          <h1 className='dark:text-white text-2xl font-bold py-4'>
            Grocery list
          </h1>
          <button
            onClick={handleLogout}
            className='border px-6 py-2 my-4 dark:text-white'
          >
            Logout
          </button>
        </div>
        <p className='dark:text-white font-medium p-4'>{user && user.email}</p>
        <button
          className='dark:text-white border px-6 py-2  m-4'
          onClick={createList}
        >
          Add list
        </button>
      </div>

      {lists}
    </div>
  )
}

export default Home
