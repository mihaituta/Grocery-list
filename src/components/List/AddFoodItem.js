import { useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'

const AddFoodItem = ({ listsCtx }) => {
  const [itemName, setItemName] = useState('')
  const itemNameRef = useRef('')

  const addFoodItemHandler = (e) => {
    e.preventDefault()
    if (itemNameRef.current.value !== '') {
      const foodItem = {
        name: itemNameRef.current.value,
        checked: false,
      }
      listsCtx.addFoodItem(foodItem)
      setItemName('')
    }
  }

  const itemNameChangeHandler = (e) => {
    e.preventDefault()
    setItemName(e.target.value)
  }

  return (
    <div className='flex items-center'>
      <form action=''>
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
  )
}

export default AddFoodItem
