import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'
import { UserAuth } from '../auth/AuthContext'
import {
  PlusIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
  CheckIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid'

import { CheckCircleIcon } from '@heroicons/react/24/outline'

const List = () => {
  const { user } = UserAuth()
  const params = useParams()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)
  const [itemName, setItemName] = useState('')
  const itemNameRef = useRef('')
  const currentList = listsCtx.currentList
  const foodItems = listsCtx.currentList.foodItems

  const deleteList = () => {
    listsCtx.deleteList(currentList.id)
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
    let checkbox = foodItems[index]

    checkbox.checked = !checkbox.checked

    listsCtx.toggleFoodItemCheckbox({
      list: foodItems,
      listId: currentList.id,
    })

    listsCtx.updateList(currentList)
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
    if (foodItems) {
      listsCtx.setCurrentList({ urlId: params.urlId })
    }
  }, [params.urlId])

  const listStatus = () => {
    const nrOfCheckedItems =
      foodItems &&
      foodItems.reduce(
        (nrOfChecks, foodItem) => nrOfChecks + (foodItem.checked === true),
        0
      )
    const completed = foodItems && nrOfCheckedItems === foodItems.length
    return (
      <div>
        {foodItems && foodItems.length > 0 && (
          <div
            className={
              completed
                ? 'ml-4 flex items-center text-white bg-green-500/80 rounded pl-1 pr-1.5 py-1'
                : 'ml-4 flex items-center text-amber-300 rounded pl-1 pr-1.5 py-1'
            }
          >
            {completed ? (
              <CheckCircleIcon className='w-6 h-6' />
            ) : (
              <ShoppingCartIcon className='w-6 h-6' />
            )}
            <p className='ml-1 text-2xl'>
              {nrOfCheckedItems}/{foodItems.length}
            </p>
          </div>
        )}
      </div>
    )
  }

  const foodItemsList = (
    <ul className='mt-2'>
      {foodItems &&
        foodItems.map((foodItem, index) => (
          <li key={index}>
            <label
              className='flex items-center bg-zinc-800 mt-2 px-4 py-3 mx-2 rounded
            cursor-pointer justify-between'
            >
              <div className='flex items-center'>
                {/*CHECKBOX INPUT*/}
                <input
                  type='checkbox'
                  checked={foodItem.checked}
                  onChange={(e) => foodItemCheckHandler(index, e)}
                  id={`checkbox-${index}`}
                  name={foodItem.name}
                  className='w-6 h-6 text-yellow-500 bg-zinc-800
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
                />

                {/*ITEM NAME*/}
                <label
                  className='ml-3 text-xl text-white flex items-center content-center place-items-center break-all cursor-pointer'
                  htmlFor={`checkbox-${index}`}
                >
                  {foodItem.name}
                </label>
              </div>

              {/*DELETE ITEMS BTN*/}
              <TrashIcon
                className='h-6 w-6 text-amber-300'
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
          {/*BACK BUTTON*/}
          <div
            className='flex items-center cursor-pointer'
            onClick={() => navigate('/')}
          >
            <ArrowUturnLeftIcon className='text-amber-300 w-5 h-5' />
            <p className='text-amber-300 text-xl ml-2'>Lists</p>
          </div>

          <div className='flex flex-row items-center justify-between '>
            {/*TITLE TEXT*/}
            <h1 className='dark:text-white text-3xl font-semibold py-2'>
              Grocery list
            </h1>

            {/*DELETE BUTTON*/}
            <button
              onClick={deleteList}
              className='border px-6 h-11 text-lg text-amber-300 border-amber-300'
            >
              Delete list
            </button>
          </div>

          {/*USER EMAIL*/}
          <p className='dark:text-white text-base mt-2 mb-4'>
            {user && user.email}
          </p>

          <div className='flex items-center justify-between	'>
            {/*INPUT ADD ITEM*/}
            <div className='flex items-center'>
              <input
                type='text'
                ref={itemNameRef}
                value={itemName}
                onChange={itemNameChangeHandler}
                onKeyDown={(e) => e.key === 'Enter' && addFoodItemHandler(e)}
                // placeholder='Enter item here...'
                placeholder='Add new item...'
                className='bg-neutral-900 text-white text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded w-40'
              />

              {/*ADD BUTTON*/}
              <button
                className='border w-10 h-10 ml-1.5 text-xl dark:text-white border-amber-300
              rounded flex items-center justify-center'
                onClick={addFoodItemHandler}
              >
                <PlusIcon className='w-6 h-6 text-amber-300' />
              </button>
            </div>

            {listStatus()}
          </div>

          {/*<button
          className='dark:text-white border px-6 py-2  m-4'
          onClick={show}
        >
          Show Current List
        </button>*/}
        </div>

        {foodItemsList}
      </div>
    </>
  )
}

export default List
