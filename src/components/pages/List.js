import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'
import { UserAuth } from '../auth/AuthContext'
import {
  PlusIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'

const List = () => {
  const { user } = UserAuth()
  const params = useParams()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)
  const [itemName, setItemName] = useState('')
  const itemNameRef = useRef('')

  const deleteList = () => {
    listsCtx.deleteList(listsCtx.currentList.id)
    navigate('/')
  }

  const addFoodItemHandler = () => {
    if (itemNameRef.current.value !== '') {
      const foodItem = {
        name: itemNameRef.current.value,
        checked: false,
      }
      listsCtx.addFoodItem(foodItem)
      setItemName('')
    }
  }

  const deleteFoodItemHandler = (foodItem, e) => {
    e.preventDefault()
    listsCtx.deleteFoodItem(foodItem)
  }

  const itemNameChangeHandler = (event) => {
    setItemName(event.target.value)
  }

  const foodItemCheckHandler = (index, e) => {
    let foodItemsCheckedStatus = listsCtx.currentList.foodItems
    let checkbox = foodItemsCheckedStatus[index]

    checkbox.checked = !checkbox.checked

    listsCtx.toggleFoodItemCheckbox({
      list: foodItemsCheckedStatus,
      listId: listsCtx.currentList.id,
    })

    listsCtx.updateList(listsCtx.currentList)
  }

  const show = (e) => {
    e.preventDefault()

    /*    console.log('lists', listsCtx.lists)
    console.log('current list', listsCtx.currentList)
    console.log('food items', listsCtx.currentList.foodItems)*/
  }

  useEffect(() => {
    return () => {
      // clear the current list when leaving the list page
      listsCtx.setCurrentList({ list: {} })
    }
  }, [])

  useEffect(() => {
    if (listsCtx.currentList.foodItems) {
      listsCtx.setCurrentList({ urlId: params.urlId })
    }
  }, [params.urlId])

  const foodItems = (
    <ul className='mt-2'>
      {listsCtx.currentList.foodItems &&
        listsCtx.currentList.foodItems.map((foodItem, index) => (
          <li key={index}>
            <label
              className='flex items-center bg-zinc-800 mt-2 px-4 py-3 mx-2 rounded
            cursor-pointer justify-between'
            >
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={foodItem.checked}
                  onChange={(e) => foodItemCheckHandler(index, e)}
                  id={`checkbox-${index}`}
                  name={foodItem.name}
                  className='w-7 h-7 text-yellow-500 bg-zinc-800
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
                />

                <label
                  className='ml-3 text-xl text-white flex items-center content-center place-items-center break-all cursor-pointer'
                  htmlFor={`checkbox-${index}`}
                >
                  {foodItem.name}
                </label>
              </div>

              <TrashIcon
                className='h-7 w-7 text-rose-500'
                onClick={(e) => deleteFoodItemHandler(foodItem, e)}
              />
            </label>
          </li>
        ))}
    </ul>
  )

  return (
    <>
      <div className='bg-neutral-900 min-h-screen min-h-full'>
        <div className='bg-zinc-800 p-4'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() => navigate('/')}
          >
            <ArrowUturnLeftIcon className='text-amber-300 w-5 h-5' />
            <p className='text-amber-300 text-xl ml-2'>Lists</p>
          </div>

          <div className='flex flex-row items-center justify-between '>
            <h1 className='dark:text-white text-3xl font-semibold py-2'>
              Grocery list
            </h1>
            <button
              onClick={deleteList}
              className='border px-6 h-11 text-lg text-amber-300 border-amber-300'
            >
              Delete list
            </button>
          </div>
          <p className='dark:text-white text-base mt-2 mb-4'>
            {user && user.email}
          </p>
          <div className='flex items-center'>
            <input
              type='text'
              ref={itemNameRef}
              value={itemName}
              onChange={itemNameChangeHandler}
              // placeholder='Enter item here...'
              placeholder='Add new item...'
              className='bg-neutral-900 text-white text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded w-48'
            />

            <button
              className='border w-10 h-10 ml-2 text-xl dark:text-white border-amber-300
              rounded flex items-center justify-center'
              onClick={addFoodItemHandler}
            >
              <PlusIcon className='w-6 h-6 text-amber-300' />
            </button>
          </div>

          {/*<button
          className='dark:text-white border px-6 py-2  m-4'
          onClick={show}
        >
          Show Current List
        </button>*/}
        </div>

        {foodItems}
      </div>
      {/*<div className='text-white'>{listsCtx.currentList.urlId}</div>*/}
      {/* <div className='flex flex-col items-start'>
        <button
          className='dark:text-white border px-6 py-2  m-4'
          onClick={deleteList}
        >
          Delete
        </button>
        <button className='text-white' onClick={show}>
          Show list
        </button>
      </div>
      <div>
        <button className='text-white' onClick={addFood}>
          Add Food
        </button>
        {foodItems}
      </div>*/}
    </>
  )
}

export default List
