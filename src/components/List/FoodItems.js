import { TrashIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useRef, useState } from 'react'

const FoodItems = ({ currentList, foodItems, listsCtx }) => {
  const foodItemPriceRefs = useRef([])
  const [priceState, setPriceState] = useState('')

  const deleteFoodItemHandler = (foodItem, e) => {
    e.preventDefault()
    listsCtx.deleteFoodItem(foodItem)
  }

  const foodItemCheckHandler = (index) => {
    let checkbox = foodItems[index]

    checkbox.checked = !checkbox.checked

    listsCtx.updateList({ foodItems, listId: currentList.id })
  }

  const editFoodItemPriceHandler = (index) => {
    let item = foodItems[index]

    item.price = foodItemPriceRefs.current[index].value

    listsCtx.updateList({ foodItems, listId: currentList.id })
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const [reorderedItem] = foodItems.splice(result.source.index, 1)
    foodItems.splice(result.destination.index, 0, reorderedItem)

    listsCtx.updateList({ foodItems, listId: currentList.id })
  }

  const showItems = (foodItem, index) => {
    return (
      <>
        <form action=''>
          <input
            style={{
              width: `${Math.min(Math.max(foodItem.price.length, 2), 5) + 2}ch`,
            }}
            type='number'
            placeholder='0'
            className='text-center bg-neutral-900 text-zinc-500 text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded h-7 p-0 mr-4'
            ref={(el) => (foodItemPriceRefs.current[index] = el)}
            value={foodItem.price}
            onChange={(e) => {
              // only allow empty or number with 6 digits and 1 or 2 decimals
              const re = /^(\s*|[1-9]\d{0,4})(\.\d{0,2})?$/
              if (re.test(e.target.value)) {
                foodItem.price = e.target.value
                setPriceState(foodItem.price)
              }
            }}
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            onBlur={(e) => editFoodItemPriceHandler(index, e)}
          />
        </form>
      </>
    )
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='dropList'>
          {(provided) => (
            <ul
              className='dropList mt-2'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/*FOOD ITEMS*/}
              {foodItems &&
                foodItems.map((foodItem, index) => (
                  <Draggable
                    key={foodItem.id}
                    draggableId={foodItem.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className='mt-2'
                      >
                        <label
                          className='flex items-center bg-zinc-800 px-4 py-3 mx-2 rounded
            cursor-pointer justify-between drop-shadow-md'
                        >
                          <div className='flex items-center'>
                            {/*CHECKBOX INPUT*/}
                            <input
                              type='checkbox'
                              checked={foodItem.checked}
                              onChange={() => foodItemCheckHandler(index)}
                              id={`checkbox-${index}`}
                              name={foodItem.name}
                              className='w-6 h-6 text-amber-300 bg-zinc-800 focus:ring-offset-0
                              border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
                            />

                            {/*ITEM NAME*/}
                            <label
                              className='ml-3 mr-3 text-xl text-white flex break-words items-center cursor-pointer'
                              htmlFor={`checkbox-${index}`}
                            >
                              {foodItem.name}
                            </label>
                          </div>

                          {/*PRICE INPUT*/}
                          <div className='flex items-center'>
                            {currentList.togglePrices
                              ? showItems(foodItem, index)
                              : foodItem.price > 0 &&
                                showItems(foodItem, index)}

                            {/*DELETE ITEMS BTN*/}
                            <TrashIcon
                              className='h-6 w-6 text-amber-300'
                              onClick={(e) =>
                                deleteFoodItemHandler(foodItem, e)
                              }
                            />
                            {/*DRAG ITEM REORDER*/}
                            <div {...provided.dragHandleProps}>
                              <Bars3Icon className='h-7 w-7 ml-4 text-zinc-500 '></Bars3Icon>
                            </div>
                          </div>
                        </label>
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default FoodItems
