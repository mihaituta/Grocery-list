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

  return (
    <>
      {/*TOTAL PRICE */}
      {foodItems && foodItems.length > 0 && (
        <div className='flex items-center justify-between my-4'>
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
                const re = /^(\s*|[1-9]\d{0,5})(\.\d{0,2})?$/
                if (re.test(e.target.value)) {
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
      )}
    </>
  )
}

export default TotalPrice
