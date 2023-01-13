import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'

const List = (props) => {
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
    console.log(listsCtx.lists)
    console.log(listsCtx.currentList)
    console.log(listsCtx.currentList.foodItems)
  }

  useEffect(() => {
    // listsCtx.setCurrentList({ urlId: params.ur })

    return () => {
      console.log('clear')
      // clear the current list when leaving the list page
      listsCtx.setCurrentList({ list: {} })
    }
  }, [])

  const foodItems = (
    <ul className='mt-2'>
      {listsCtx.currentList.foodItems &&
        listsCtx.currentList.foodItems.map((foodItem, index) => (
          <li key={index}>
            <label className='inline-flex items-center bg-zinc-500 mt-2 p-2 w-full'>
              <input
                className='w-8 h-8 text-green-600 focus:border-none border-none focus:ring-0 ring-0 rounded-full'
                type='checkbox'
                id={`checkbox-${index}`}
                name={foodItem.name}
              />
              <label
                className='ml-3 text-2xl font-semibold text-white'
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
      <div className='text-white'>{listsCtx.currentList.urlId}</div>
      <div className='flex flex-col items-start'>
        <button className='text-white' onClick={deleteList}>
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
      </div>
    </>
  )
}

export default List
