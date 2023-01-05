import { useReducer } from 'react'
import ListsContext from './ListsContext'
import { nanoid } from 'nanoid'
import { fbAuth, fbDB, collection, addDoc } from './firebase'

const defaultListsState = {
  lists: [],
}

const listsReducer = (state, action) => {
  if (action.type === 'GET_LISTS') {
  }

  if (action.type === 'ADD') {
    console.log(nanoid(10))
    const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`)

    const addList = async () => {
      try {
        await addDoc(listsQuery, {
          date: new Date().toISOString(),
          items: [],
          urlId: nanoid(10),
        })
      } catch (error) {
        console.log(error)
        return error
      }
    }

    addList()

    return defaultListsState
  }

  if (action.type === 'DELETE') {
  }
}

const ListsProvider = (props) => {
  const [listsState, dispatchListsAction] = useReducer(
    listsReducer,
    defaultListsState
  )

  const getListsHandler = (lists) => {
    dispatchListsAction({ type: 'GET_LISTS', lists: lists })
  }

  const addListHandler = (list) => {
    dispatchListsAction({ type: 'ADD', list: list })
  }

  const deleteListHandler = (id) => {
    dispatchListsAction({ type: 'DELETE', id: id })
  }

  const listsContext = {
    lists: listsState.lists,
    getLists: getListsHandler,
    addList: addListHandler,
    removeList: deleteListHandler,
  }

  return (
    <ListsContext.Provider value={listsContext}>
      {props.children}
    </ListsContext.Provider>
  )
}

export default ListsProvider
