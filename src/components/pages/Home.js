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
            className='h-28	bg-yellow-500 rounded list-none'
            key={list.urlId}
            onClick={() => listRedirect(list)}
          >
            {list.urlId}
            {/*<button onClick={() => listsCtx.deleteList(list.id)}>Delete</button>*/}
          </div>
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
          onClick={listsCtx.addList}
        >
          Add list
        </button>
        <button
          className='dark:text-white border px-6 py-2  m-4'
          onClick={show}
        >
          Show Current List
        </button>
      </div>

      {lists}
    </div>
  )
}

export default Home
