import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'

import FoodItems from '../List/FoodItems'
import ProgressBar from '../List/ProgressBar'
import ListCheckedStatus from '../List/ListCheckedStatus'
import AddFoodItem from '../List/AddFoodItem'
import Header from '../Auth/Layout/Header'

const List = () => {
  const params = useParams()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)
  const currentList = listsCtx.currentList
  const foodItems = listsCtx.currentList.foodItems

  const deleteList = () => {
    listsCtx.deleteList(currentList.id)
    navigate('/')
  }

  /*  const show = (e) => {
    e.preventDefault()

    console.log('lists', listsCtx.lists)
    console.log('current list', listsCtx.currentList)
    console.log('food items', listsCtx.currentList.foodItems)
  }*/

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

  return (
    <>
      <Header
        buttonText='Delete list'
        buttonFunction={deleteList}
        listPage={true}
        foodItems={foodItems}
        currentList={currentList}
        listsCtx={listsCtx}
      >
        <div className='flex items-center justify-between'>
          {/*INPUT ADD ITEM*/}
          <AddFoodItem listsCtx={listsCtx} />

          <ListCheckedStatus
            foodItems={foodItems}
            currentList={currentList}
            listsCtx={listsCtx}
          />
        </div>
        {/*<button
          className='text-white border px-6 py-2  m-4'
          onClick={show}
        >
          Show Current List
        </button>*/}
        <ProgressBar foodItems={foodItems} />
      </Header>

      <FoodItems
        foodItems={foodItems}
        currentList={currentList}
        listsCtx={listsCtx}
      />
    </>
  )
}

export default List
