import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'
import { UserAuth } from '../auth/AuthContext'

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
            <label className='flex items-center bg-zinc-800 mt-3 px-4 py-4 mx-3 rounded '>
              <input
                className='w-7 h-7 text-sky-600  bg-zinc-800
                focus:ring-offset-0 border-2 border-white focus:ring-0 ring-0 rounded-full '
                type='checkbox'
                id={`checkbox-${index}`}
                name={foodItem.name}
              />

              <label
                className='ml-3 text-2xl text-white flex items-center content-center place-items-center'
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
          <h1 className='dark:text-white text-4xl font-semibold py-4'>
            Grocery list
          </h1>
          <p className='dark:text-white text-xl mt-4 mb-6'>
            {user && user.email}
          </p>
          <button
            className='border px-6 h-12 text-xl dark:text-white'
            onClick={addFood}
          >
            Add Food
          </button>
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
