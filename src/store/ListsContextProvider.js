import React, { useContext, useReducer, useState } from 'react'
import { nanoid } from 'nanoid'
import { fbAuth, fbDB, collection, addDoc, getDocs } from './firebase'

const ListsContext = React.createContext({
  lists: [],
  getLists: (lists) => {},
  addList: (list) => {},
  deleteList: (id) => {},
})

// const defaultListsState = {
//   lists: ['sms'],
// }

const listsReducer = async (state, action) => {
  if (action.type === 'GET_LISTS') {
    /*const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`)

    const updatedLists = []

    try {
      const snapshot = await getDocs(listsQuery)

      snapshot.forEach((doc) => {
        let list = doc.data()
        const id = doc.id
        const temp = {
          id,
          date: list.date,
          urlId: list.urlId,
          items: list.items,
        }
        updatedLists.push(temp)
      })
    } catch (e) {
      console.log(e.message)
    }

    console.log(updatedLists)
    return {
      lists: updatedLists,
    }*/
  }

  if (action.type === 'ADD') {
    console.log(nanoid(10))
    const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`)

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

  if (action.type === 'DELETE') {
  }

  // return defaultListsState
}

export const ListsContextProvider = ({ children }) => {
  const [lists, setLists] = useState([])
  /*  const [listsState, dispatchListsAction] = useReducer(listsReducer, {
    list: [],
  })*/

  const getListsHandler = async () => {
    // dispatchListsAction({ type: 'GET_LISTS' })
    const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`)

    const updatedLists = []

    try {
      const snapshot = await getDocs(listsQuery)

      snapshot.forEach((doc) => {
        let list = doc.data()
        const id = doc.id
        const temp = {
          id,
          date: list.date,
          urlId: list.urlId,
          items: list.items,
        }
        updatedLists.push(temp)
      })
    } catch (e) {
      console.log(e.message)
    }

    // console.log(updatedLists)
    setLists(updatedLists)
  }

  /*  const addListHandler = (list) => {
    dispatchListsAction({ type: 'ADD', list: list })
  }

  const deleteListHandler = (id) => {
    dispatchListsAction({ type: 'DELETE', id: id })
  }*/

  const listsContext = {
    lists,
    getLists: getListsHandler,
    /*addList: addListHandler,
    deleteList: deleteListHandler,*/
  }

  return (
    <ListsContext.Provider value={listsContext}>
      {children}
    </ListsContext.Provider>
  )
}

export default ListsContext
