import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { nanoid } from 'nanoid'
import {
  fbAuth,
  fbDB,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  orderBy,
  doc,
} from './firebase'
import appReducer from './AppReducer'

const initState = {
  lists: [],
  currentList: {},
  setCurrentList: (payload) => {},
  addList: (list) => {},
  getLists: () => {},
  deleteList: (id) => {},
  setListsListener: null,
  unsubscribeListsListener: () => {},
}

export const ListsContext = createContext(initState)

export const ListsContextProvider = ({ children }) => {
  const [state, dispatchListsAction] = useReducer(appReducer, initState)

  const getListsHandler = async () => {
    const userId = fbAuth.currentUser.uid

    const listsQueryOrdered = query(
      collection(fbDB, `users/${userId}/lists`),
      orderBy('date', 'desc')
    )

    const updatedLists = []
    try {
      const snapshot = await getDocs(listsQueryOrdered)

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

    dispatchListsAction({ type: 'GET_LISTS', payload: updatedLists })
  }

  const addListHandler = async () => {
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

  const deleteListHandler = async (id) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = doc(fbDB, `users/${userId}/lists`, id)

    try {
      await deleteDoc(listsQuery)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const setCurrentListHandler = (payload) => {
    dispatchListsAction({ type: 'SET_CURRENT_LIST', payload })
  }

  const setListsListenerHandler = () => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = query(
      collection(fbDB, `users/${userId}/lists`),
      orderBy('date', 'desc')
    )
    let initState = true
    const unsubscribeListener = onSnapshot(listsQuery, (snapshot) => {
      if (initState) {
        initState = false
      } else {
        if (!snapshot.docChanges().empty) {
          snapshot.docChanges().forEach((change) => {
            let list = change.doc.data()
            const id = change.doc.id
            const listData = {
              id,
              date: new Date(list.date),
              urlId: list.urlId,
              items: list.items,
            }
            if (change.type === 'added') {
              console.log('added')
              dispatchListsAction({ type: 'ADD_LIST', payload: listData })
            } else if (change.type === 'modified') {
              console.log('modified')
            } else if (change.type === 'removed') {
              dispatchListsAction({ type: 'DELETE_LIST', payload: id })
              console.log('removed')
            }
          })
        }
      }
    })
    dispatchListsAction({
      type: 'UNSUBSCRIBE_LISTENER',
      payload: unsubscribeListener,
    })
  }

  const clearDataHandler = () => {
    dispatchListsAction({ type: 'CLEAR_DATA' })
  }

  /*  const [lists, setLists] = useState([])
  const [listsListener, setListsListener] = useState(null)
  let listsTemp = []

  const getListsHandler = async () => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = query(
      collection(fbDB, `users/${userId}/lists`),
      orderBy('date', 'desc')
    )

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

      listsTemp = updatedLists
      setLists(updatedLists)
    } catch (e) {
      console.log(e.message)
    }
  }

  const setListsListenerHandler = () => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = query(
      collection(fbDB, `users/${userId}/lists`),
      orderBy('date', 'desc')
    )
    let initState = true
    const unsubscribe = onSnapshot(listsQuery, (snapshot) => {
      if (initState) {
        initState = false
      } else {
        if (!snapshot.docChanges().empty) {
          snapshot.docChanges().forEach((change) => {
            let list = change.doc.data()
            const id = change.doc.id
            const listData = {
              id,
              date: new Date(list.date),
              urlId: list.urlId,
              items: list.items,
            }
            if (change.type === 'added') {
              console.log('added')
              setLists([listData, ...listsTemp])
              listsTemp = [listData, ...listsTemp]
            } else if (change.type === 'modified') {
              console.log('modified')
            } else if (change.type === 'removed') {
              console.log('removed')
            }
          })
        }
      }
    })
    // setListsListener(unsubscribe)
  }

  const addListHandler = async () => {
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

  const deleteListHandler = async (payload) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`, payload)

    try {
      await deleteDoc(listsQuery)
    } catch (error) {
      console.log(error)
    }
  }*/

  const listsContext = {
    lists: state.lists,
    currentList: state.currentList,
    setCurrentList: setCurrentListHandler,
    getLists: getListsHandler,
    addList: addListHandler,
    deleteList: deleteListHandler,
    setListsListener: setListsListenerHandler,
    unsubscribeListsListener: state.unsubscribeListsListener,
    clearData: clearDataHandler,
    // deleteList: deleteListHandler,
  }

  return (
    <ListsContext.Provider value={listsContext}>
      {children}
    </ListsContext.Provider>
  )
}
