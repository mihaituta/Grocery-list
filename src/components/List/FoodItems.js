import { TrashIcon } from '@heroicons/react/24/solid'

const FoodItems = ({ currentList, foodItems, listsCtx }) => {
  const deleteFoodItemHandler = (foodItem, e) => {
    e.preventDefault()
    listsCtx.deleteFoodItem(foodItem)
  }

  const foodItemCheckHandler = (index, e) => {
    let checkbox = foodItems[index]

    checkbox.checked = !checkbox.checked

    listsCtx.toggleFoodItemCheckbox({
      list: foodItems,
      listId: currentList.id,
    })

    listsCtx.updateList({ list: currentList })
  }

  return (
    <ul className='mt-2'>
      {foodItems &&
        foodItems.map((foodItem, index) => (
          <li key={index}>
            <label
              className='flex items-center bg-zinc-800 mt-2 px-4 py-3 mx-2 rounded
            cursor-pointer justify-between drop-shadow-md'
            >
              <div className='flex items-center'>
                {/*CHECKBOX INPUT*/}
                <input
                  type='checkbox'
                  checked={foodItem.checked}
                  onChange={(e) => foodItemCheckHandler(index, e)}
                  id={`checkbox-${index}`}
                  name={foodItem.name}
                  className='w-6 h-6 text-amber-300 bg-zinc-800
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
                />

                {/*ITEM NAME*/}
                <label
                  className='ml-3 mr-3 text-xl text-white flex items-center content-center place-items-center break-all cursor-pointer'
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
}

export default FoodItems
