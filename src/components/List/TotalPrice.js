import CheckedItemsHelper from '../Helpers/CheckedItemsHelper'
import { useContext, useRef, useState } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'

const TotalPrice = () => {
  const [totalPriceState, setTotalPriceState] = useState('')
  const totalPriceRef = useRef('')
  const { currentList, updateList } = useContext(ListsContext)
  const foodItems = currentList.foodItems

  const togglePrices = () => {
    updateList({
      updateTogglePrices: true,
      togglePrices: currentList.togglePrices,
      listId: currentList.id,
    })
  }

  //prettier-ignore
  const editTotalPrice = () => {
    if (totalPriceRef.current.value === '') {
      currentList.totalPrice = ''
      // totalPriceRef.current.value = ''
    } else {
      currentList.totalPrice = String(parseFloat((Number(totalPriceRef.current.value)).toFixed(2)))
      // totalPriceRef.current.value = String(parseFloat(Number(totalPriceRef.current.value).toFixed(2)))
    }

     updateList({
      updateTotalPrice: true,
      canEditTotalPrices: currentList.canEditTotalPrices,
      totalPrice: currentList.totalPrice,
      listId: currentList.id,
    })
  }

  //prettier-ignore
  const checkedItemsPrice = () => Number(String(CheckedItemsHelper(foodItems).checkedItems.reduce((total, foodItem) => total + Number(foodItem.price), 0).toFixed(2)))

  return (
    <>
      {foodItems && foodItems.length > 0 && (
        <div className='my-4'>
          <div className='flex items-center justify-between '>
            {/*TOTAL PRICE */}
            <div className='text-white text-xl'>
              Total:
              {/*prettier-ignore*/}
              <input
              style={{width: `${Math.min(Math.max(currentList.totalPrice.length, 2), 10) + 2}ch`,}}
              ref={totalPriceRef}
              readOnly={CheckedItemsHelper(foodItems).listCompletedWithAllItemsChecked}
              value={currentList.totalPrice}
              onChange={(e) => {
                // only allow empty or number with 6 digits and 1 or 2 decimals
                const regex = /^(\s*|[1-9]\d{0,5})(\.\d{0,2})?$/
                if (regex.test(e.target.value)) {
                  currentList.totalPrice = e.target.value
                  setTotalPriceState(currentList.totalPrice)
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              onBlur={(e) => editTotalPrice(e)}
              type='number'
              placeholder='0'
              className='disabled:cursor-not-allowed appearance-none text-center bg-neutral-900 text-zinc-300 text-lg placeholder-neutral-600
             border-0 focus:ring-0 ring-0 rounded h-8 mx-2 p-0'
            />
              lei
            </div>

            {/*TOGGLE PRICES*/}
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={currentList.togglePrices}
                onChange={togglePrices}
                id='pricesInput'
                className='w-5 h-5 text-amber-300 bg-zinc-800 focus:ring-offset-0
                border-2 border-amber-300 focus:ring-0 ring-0 rounded-full cursor-pointer'
              />
              <label className='text-white ml-2 text-lg' htmlFor='pricesInput'>
                Prices
              </label>
            </div>
          </div>
          {/*CURRENT PRICE*/}
          {/*ONLY SHOW IF ALL ITEMS ARE NOT CHECKED && IF THERE ARE ANY CHECKED ITEMS && IF CURRENT IS NOT 0*/}
          {!CheckedItemsHelper(foodItems).listCompletedWithAllItemsChecked &&
            CheckedItemsHelper(foodItems).checkedItems.length > 0 &&
            checkedItemsPrice() > 0 && (
              <div className='text-neutral-500 font-semibold mt-3'>
                Current price:
                <span className='mx-1.5 py-1 px-1.5 bg-neutral-900 text-neutral-400 rounded'>
                  {checkedItemsPrice()}
                </span>
                lei
              </div>
            )}
        </div>
      )}
    </>
  )
}

export default TotalPrice
