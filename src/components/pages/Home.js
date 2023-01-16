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

  const formattedDate = (list) => {
    const date = new Date(list)
    // prettier-ignore
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    /*    const addZeroBeforeSingleDIgitDay =
      date.getDate().toString().length === 1
        ? '0' + date.getDate()
        : date.getDate()*/

    // prettier-ignore
    return `${'(' + days[date.getDay()] + ') ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear().toString().slice(2)
    }`
  }

  const lists = (
    <div className='grid grid-cols-2 gap-4 bg-zinc-900 m-4'>
      {listsCtx.lists &&
        listsCtx.lists.map((list) => (
          <div
            className='h-28	bg-zinc-800 rounded list-none cursor-pointer
             overflow-hidden overflow-ellipsis relative drop-shadow-md'
            key={list.id}
            onClick={() => listRedirect(list)}
          >
            <ul className='text-neutral-400 px-2 py-1 h-4/6	overflow-hidden overflow-ellipsis'>
              {list.foodItems.map((item, index) => (
                <li key={item.id} className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={item.checked}
                    readOnly
                    className='w-4 h-4 text-amber-400 mr-1.5 bg-transparent focus:ring-offset-0
                    border-amber-400/80 border-2 focus:ring-0 ring-0 rounded-full cursor-pointer'
                  />
                  <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {item.name + (index === 2 ? '...' : '')}
                  </div>
                </li>
              ))}
            </ul>
            <div className='text-amber-300 text-s absolute right-3 bottom-2'>
              {/*right-2 bottom-1*/}
              {formattedDate(list.date)}
            </div>

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
