import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'

import FoodItems from '../List/FoodItems'
import ProgressBar from '../List/ProgressBar'
import AddFoodItem from '../List/AddFoodItem'
import Header from '../Layout/Header'
import LoadingDataPlaceholder from '../List/LoadingDataPlaceholder'

const List = () => {
  const params = useParams()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)
  const currentList = listsCtx.currentList
  const foodItems = listsCtx.currentList.foodItems
  const loadingLists = listsCtx.loadingLists

  const deleteList = () => {
    listsCtx.deleteList(currentList.id)
    navigate('/')
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

  return (
    <>
      <Header
        buttonText='Delete list'
        buttonFunction={deleteList}
        listPage={true}
      >
        {/*INPUT ADD ITEM*/}
        <AddFoodItem
          listPage={true}
          listsCtx={listsCtx}
          foodItems={foodItems}
          currentList={currentList}
        />

        <ProgressBar foodItems={foodItems} />
      </Header>

      {/*PLACEHOLDER FOR LOADING DATA OR NO DATA*/}
      <LoadingDataPlaceholder
        loadingLists={loadingLists}
        data={foodItems}
        dataLoadingMessage='Loading food items...'
        noDataMessage='List is empty.'
      />

      {/*FOOD ITEMS*/}
      <FoodItems
        foodItems={foodItems}
        currentList={currentList}
        listsCtx={listsCtx}
      />
    </>
  )
}

export default List
