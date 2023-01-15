import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../auth/AuthContext'
import { ListsContext } from '../../store/ListsContextProvider'

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

  const listRedirect = (list) => {
    listsCtx.setCurrentList({ list })
    navigate('/list/' + list.urlId)
  }

  const show = () => {
    console.log(listsCtx.lists)
    console.log(listsCtx.currentList)
  }

  const lists = (
    <div className='grid grid-cols-2 gap-4 bg-zinc-900 m-4'>
      {listsCtx.lists &&
        listsCtx.lists.map((list) => (
          <div
            className='h-28	bg-zinc-800 rounded list-none cursor-pointer
             overflow-hidden drop-shadow-md'
            key={list.id}
            onClick={() => listRedirect(list)}
          >
            <ul className='text-neutral-400 font-normal px-2 py-1 '>
              {list.foodItems.map((item) => (
                <li key={item.id} className='flex items-center '>
                  <input
                    type='checkbox'
                    checked={item.checked}
                    readOnly
                    className='w-4 h-4 text-amber-400 mr-1.5 bg-transparent focus:ring-offset-0
                    border-amber-400/80 border-2 focus:ring-0 ring-0 rounded-full cursor-pointer'
                  />

                  {item.name}
                </li>
              ))}
            </ul>

            {/*<button onClick={() => listsCtx.deleteList(list.id)}>Delete</button>*/}
          </div>
        ))}
    </div>
  )

  return (
    <div className='bg-neutral-900 min-h-screen min-h-full'>
      <div className='bg-zinc-800 p-4 drop-shadow-lg sticky top-0 z-30'>
        <div className='flex flex-row items-center justify-between '>
          <h1 className='text-white text-3xl font-semibold py-2'>
            Grocery list
          </h1>
          <button
            onClick={handleLogout}
            className='border px-6 h-11 text-lg text-amber-300 border-amber-300'
          >
            Logout
          </button>
        </div>
        <p className='text-white text-base mt-2 mb-4'>{user && user.email}</p>
        <button
          className='border px-6 h-11 text-xl text-amber-300 border-amber-300'
          onClick={listsCtx.addList}
        >
          Add list
        </button>
        {/*<button
          className='text-white border px-6 py-2  m-4'
          onClick={show}
        >
          Show Current List
        </button>*/}
      </div>

      {lists}
    </div>
  )
}

export default Home
