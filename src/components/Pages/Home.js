import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Auth/AuthContext'
import { ListsContext } from '../../store/ListsContextProvider'
import ShowLists from '../List/ShowLists'
import Header from '../Layout/Header'
import LoadingDataPlaceholder from '../List/LoadingDataPlaceholder'

const Home = () => {
  const { logout } = UserAuth()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)
  const loadingLists = listsCtx.loadingLists

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <Header buttonText='Logout' buttonFunction={handleLogout}>
        {/*ADD LIST*/}
        <button
          className='border px-4 h-10 mt-1 text-xl text-amber-300 border-amber-300'
          onClick={listsCtx.addList}
        >
          Add list
        </button>
      </Header>

      {/*PLACEHOLDER FOR LOADING DATA OR NO DATA*/}
      <LoadingDataPlaceholder
        loadingLists={loadingLists}
        data={listsCtx.lists}
        dataLoadingMessage='Loading lists...'
        noDataMessage='No lists added.'
      />

      {/*LISTS*/}
      <ShowLists listsCtx={listsCtx} />
    </>
  )
}

export default Home
