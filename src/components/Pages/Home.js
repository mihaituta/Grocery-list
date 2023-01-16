import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Auth/AuthContext'
import { ListsContext } from '../../store/ListsContextProvider'
import ShowLists from '../ShowLists'
import Header from '../Auth/Layout/Header'

const Home = () => {
  const { logout } = UserAuth()
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

  // const show = () => {
  //   console.log(listsCtx.lists)
  //   console.log(listsCtx.currentList)
  // }

  return (
    <>
      <Header buttonText='Logout' buttonFunction={handleLogout}>
        {/*Add list*/}
        <button
          className='border px-6 h-11 text-xl text-amber-300 border-amber-300'
          onClick={listsCtx.addList}
        >
          Add list
        </button>
      </Header>
      <ShowLists listsCtx={listsCtx} />
    </>
  )
}

export default Home
