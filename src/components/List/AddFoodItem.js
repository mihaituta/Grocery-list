import { useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import ListCheckedStatus from './ListCheckedStatus'
import SavedFoodsChips from './SavedFoodsChips'

const AddFoodItem = ({ listsCtx, listPage, foodItems, currentList }) => {
  const [itemName, setItemName] = useState('')
  const [filteredFoods, setFilteredFoods] = useState('')
  const itemNameRef = useRef('')

  const addFoodItemHandler = (e, foodName) => {
    e.preventDefault()
    if (itemNameRef.current.value !== '') {
      const foodItem = {
        name: foodName ? foodName : itemNameRef.current.value,
        checked: false,
      }
      listsCtx.addFoodItem(foodItem)

      // if item is already added in savedFoods don't add it again
      if (!foodName) listsCtx.addSavedFood(itemNameRef.current.value)
      setItemName('')
    }
  }

  const itemNameChangeHandler = (e) => {
    e.preventDefault()
    setItemName(e.target.value)

    //prettier-ignore
    setFilteredFoods(
      listsCtx.savedFoods &&
        listsCtx.savedFoods.filter((food) => {const stringHasMultipleWords = food.includes(' ')

          if (stringHasMultipleWords) {
            const splitWord = food.split(' ')
            // returns true if one of the words in the string starts with the typed input
            return (splitWord.filter((splitWord) => splitWord.toLowerCase()
                  .startsWith(itemNameRef.current.value.toLowerCase())).length > 0)
          }

          return food.toLowerCase().startsWith(itemNameRef.current.value.toLowerCase())
        })
    )
  }

  return (
    <div>
      <SavedFoodsChips
        listPage={listPage}
        itemNameRef={itemNameRef}
        filteredFoods={filteredFoods}
        addFoodItemHandler={addFoodItemHandler}
      />

      {/*ADD ITEM*/}
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <form action=''>
            <input
              type='text'
              ref={itemNameRef}
              value={itemName}
              onChange={itemNameChangeHandler}
              onKeyDown={(e) => e.key === 'Enter' && addFoodItemHandler(e)}
              placeholder='Add new item...'
              className='bg-neutral-900 text-white text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded w-40'
            />
          </form>

          {/*ADD BUTTON*/}
          <button
            className='border w-10 h-10 ml-1.5 text-xl text-white border-amber-300
                  rounded flex items-center justify-center'
            onClick={addFoodItemHandler}
          >
            <PlusIcon className='w-6 h-6 text-amber-300' />
          </button>
        </div>

        <ListCheckedStatus
          foodItems={foodItems}
          currentList={currentList}
          listsCtx={listsCtx}
        />
      </div>
    </div>
  )
}

export default AddFoodItem
