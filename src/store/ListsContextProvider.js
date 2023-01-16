import React, { createContext, useReducer } from 'react'
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
  updateDoc,
  arrayUnion,
  arrayRemove,
} from './firebase'
import appReducer from './AppReducer'
import { useLocation, useNavigate } from 'react-router-dom'

const initState = {
  lists: [],
  togglePrices: false,
  currentList: {},
  setCurrentList: (payload) => {},
  addList: (list) => {},
  getLists: () => {},
  deleteList: (id) => {},
  addFoodItem: (foodItem) => {},
  // ? editFoodItem: (item) => {},
  deleteFoodItem: (foodItem) => {},
  reorderFoodItems: (list) => {},
  toggleFoodItemCheckbox: (payload) => {},
  setListsListener: null,
  unsubscribeListsListener: () => {},
}

export const ListsContext = createContext(initState)

export const ListsContextProvider = ({ children }) => {
  const [state, dispatchListsAction] = useReducer(appReducer, initState)
  const currentUrl = useLocation()
  const navigate = useNavigate()

  // GET LISTS
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
          foodItems: list.foodItems,
        }
        updatedLists.push(temp)
      })

      dispatchListsAction({ type: 'GET_LISTS', payload: updatedLists })
      // when the current page URL contains 'list' meaning its on a list's page, set the current list state by its urlId
      if (currentUrl.pathname.includes('list')) {
        const urlId = currentUrl.pathname.substring(6)
        dispatchListsAction({
          type: 'SET_CURRENT_LIST',
          payload: { urlId },
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  // ADD LIST
  const addListHandler = async () => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`)

    try {
      await addDoc(listsQuery, {
        date: new Date().toISOString(),
        urlId: nanoid(10),
        foodItems: [],
        canUpdateDate: true,
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // UPDATE LIST
  const updateListHandler = async (payload) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = doc(fbDB, `users/${userId}/lists`, payload.list.id)

    let listData = {
      foodItems: payload.list.foodItems,
    }

    if (payload.canUpdateDate === false) {
      listData = {
        canUpdateDate: false,
        date: new Date().toISOString(),
      }
    }

    try {
      await updateDoc(listsQuery, listData)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  // DELETE LIST
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

  // ADD FOOD ITEM
  const addFoodItemHandler = async (item) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = doc(fbDB, `users/${userId}/lists`, state.currentList.id)

    try {
      await updateDoc(
        listsQuery,
        {
          foodItems: arrayUnion({
            id: nanoid(20),
            name: item.name,
            checked: item.checked,
          }),
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }
  }

  // DELETE FOOD ITEM
  const deleteFoodItemHandler = async (foodItem) => {
    const userId = fbAuth.currentUser.uid

    const listsQuery = doc(fbDB, `users/${userId}/lists`, state.currentList.id)
    try {
      await updateDoc(
        listsQuery,
        {
          foodItems: arrayRemove(foodItem),
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }
  }

  // TOGGLE FOOD ITEM CHECKBOX
  const toggleFoodItemCheckboxHandler = async (payload) => {
    dispatchListsAction({ type: 'TOGGLE_FOODITEM_CHECKBOX', payload })
  }

  //
  const reorderFoodItemsHandler = async (payload) => {
    dispatchListsAction({ type: 'REORDER_LIST_ITEMS', payload })
  }

  // SET CURRENT LIST
  const setCurrentListHandler = (payload) => {
    dispatchListsAction({ type: 'SET_CURRENT_LIST', payload })
  }

  // SET LISTENER
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
              canUpdateDate: list.canUpdateDate,
              date: new Date(list.date),
              urlId: list.urlId,
              foodItems: list.foodItems,
            }
            if (change.type === 'added') {
              console.log('added')
              dispatchListsAction({ type: 'ADD_LIST', payload: listData })
            } else if (change.type === 'modified') {
              console.log('modified')
              dispatchListsAction({
                type: 'SET_CURRENT_LIST',
                payload: { list: listData },
              })
              dispatchListsAction({ type: 'UPDATE_LIST', payload: listData })
            } else if (change.type === 'removed') {
              // can't go back on the page after it has been deleted and redirected to home
              navigate('/', { replace: true })
              dispatchListsAction({ type: 'DELETE_LIST', payload: id })
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

  // CLEAR DATA
  const clearDataHandler = () => {
    dispatchListsAction({ type: 'CLEAR_DATA' })
  }

  const listsContext = {
    lists: state.lists,
    togglePrices: state.togglePrices,
    currentList: state.currentList,
    setCurrentList: setCurrentListHandler,
    getLists: getListsHandler,
    addList: addListHandler,
    updateList: updateListHandler,
    deleteList: deleteListHandler,
    addFoodItem: addFoodItemHandler,
    deleteFoodItem: deleteFoodItemHandler,
    reorderFoodItems: reorderFoodItemsHandler,
    toggleFoodItemCheckbox: toggleFoodItemCheckboxHandler,
    setListsListener: setListsListenerHandler,
    unsubscribeListsListener: state.unsubscribeListsListener,
    clearData: clearDataHandler,
  }

  return (
    <ListsContext.Provider value={listsContext}>
      {children}
    </ListsContext.Provider>
  )
}
