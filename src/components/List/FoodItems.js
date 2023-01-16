import { TrashIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState } from 'react'

const FoodItems = ({ currentList, foodItems, listsCtx }) => {
  const deleteFoodItemHandler = (foodItem, e) => {
    e.preventDefault()
    listsCtx.deleteFoodItem(foodItem)
  }

  const foodItemCheckHandler = (index) => {
    let checkbox = foodItems[index]

    checkbox.checked = !checkbox.checked

    listsCtx.toggleFoodItemCheckbox({
      list: foodItems,
      listId: currentList.id,
    })

    listsCtx.updateList({ list: currentList })
  }

  const [testList, setTestList] = useState([
    {
      id: '1',
      name: 'Pizza',
    },
    {
      id: '2',
      name: 'Bread',
    },
    {
      id: '3',
      name: 'Eggs',
    },
    {
      id: '4',
      name: 'Cola',
    },
  ])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = currentList.foodItems

    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    listsCtx.updateList({ list: currentList })
  }

  const test = () => {
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
                        >
                          <label
                            className='flex items-center bg-zinc-800 mt-2 px-4 py-3 mx-2 rounded
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
                                className='w-6 h-6 text-amber-300 bg-zinc-800
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
                              />

                              {/*ITEM NAME*/}
                              <label
                                className='ml-3 mr-3 text-xl text-white flex items-center break-all pointer'
                                htmlFor={`checkbox-${index}`}
                              >
                                {foodItem.name}
                              </label>
                            </div>
                            <div className='flex items-center'>
                              {/*DELETE ITEMS BTN*/}
                              <TrashIcon
                                className='h-6 w-6 ml-4 text-amber-300'
                                onClick={(e) =>
                                  deleteFoodItemHandler(foodItem, e)
                                }
                              />
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

  return (
    <>
      {test()}
      {/* <ul className='mt-2'>
        {foodItems &&
          foodItems.map((foodItem, index) => (
            <li key={index}>
              <label
                className='flex items-center bg-zinc-800 mt-2 px-4 py-3 mx-2 rounded
            cursor-pointer justify-between drop-shadow-md'
              >
                <div className='flex items-center'>
                  CHECKBOX INPUT
                  <input
                    type='checkbox'
                    checked={foodItem.checked}
                    onChange={(e) => foodItemCheckHandler(index, e)}
                    id={`checkbox-${index}`}
                    name={foodItem.name}
                    className='w-6 h-6 text-amber-300 bg-zinc-800
                focus:ring-offset-0 border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
                  />
                  ITEM NAME
                  <label
                    className='ml-3 mr-3 text-xl text-white flex items-center content-center place-items-center break-all cursor-pointer'
                    htmlFor={`checkbox-${index}`}
                  >
                    {foodItem.name}
                  </label>
                </div>
                <div className='flex items-center'>
                  DELETE ITEMS BTN
                  <TrashIcon
                    className='h-6 w-6 ml-4 text-amber-300'
                    onClick={(e) => deleteFoodItemHandler(foodItem, e)}
                  />
                  <Bars3Icon className='h-7 w-7 ml-4 text-zinc-500 '></Bars3Icon>
                </div>
              </label>
            </li>
          ))}
      </ul>*/}
    </>
  )
}

export default FoodItems
