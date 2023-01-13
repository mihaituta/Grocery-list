import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'
import { UserAuth } from '../auth/AuthContext'
import { PlusIcon } from '@heroicons/react/24/solid'

const List = () => {
  const { user } = UserAuth()
  const params = useParams()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)

  const deleteList = () => {
    listsCtx.deleteList(listsCtx.currentList.id)
    navigate('/')
  }

  const addFood = () => {
    const foodItem = {
      name: 'Paine',
      checked: false,
    }
    listsCtx.addFoodItem(foodItem)
  }

  const show = () => {
    console.log('lists', listsCtx.lists)
    console.log('current list', listsCtx.currentList)
    console.log('food items', listsCtx.currentList.foodItems)
  }

  useEffect(() => {
    return () => {
      console.log('clear')
      // clear the current list when leaving the list page
      listsCtx.setCurrentList({ list: {} })
    }
  }, [])

  useEffect(() => {
    if (listsCtx.currentList.foodItems) {
      console.log('no current list')
      listsCtx.setCurrentList({ urlId: params.urlId })
    }
  }, [params.urlId])

  const foodItems = (
    <ul className='mt-2'>
      {listsCtx.currentList.foodItems &&
        listsCtx.currentList.foodItems.map((foodItem, index) => (
          <li key={index}>
            <label className='flex items-center bg-zinc-800 mt-2 px-4 py-3 mx-2 rounded'>
              <input
                className='w-7 h-7  text-yellow-500     bg-zinc-800
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full '
                type='checkbox'
                id={`checkbox-${index}`}
                name={foodItem.name}
              />

              <label
                className='ml-3 text-xl text-white flex items-center content-center place-items-center'
                htmlFor={`checkbox-${index}`}
              >
                {foodItem.name}
              </label>
            </label>
          </li>
        ))}
    </ul>
  )

  return (
    <>
      <div className='bg-neutral-900 min-h-screen min-h-full'>
        <div className='bg-zinc-800 p-4'>
          <div className='flex flex-row items-center justify-between '>
            <h1 className='dark:text-white text-3xl font-semibold py-2'>
              Grocery list
            </h1>
            <button
              onClick={deleteList}
              className='border px-6 h-11 text-lg  text-amber-300 border-amber-300'
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
              // placeholder='Enter item here...'
              placeholder='Add new item...'
              className='bg-neutral-900 text-white text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded w-48'
            />

            <button
              className='border w-10 h-10 ml-2 text-xl dark:text-white border-amber-300
              rounded flex items-center justify-center'
              onClick={addFood}
            >
              <PlusIcon className='w-5 h-5 text-amber-300' />
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
