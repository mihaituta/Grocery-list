import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import CheckedItemsHelper from '../CheckedItemsHelper'

const ListCheckedStatus = ({ foodItems, currentList, listsCtx }) => {
  const {
    listCompletedWithAllItemsChecked,
    isListCompleted,
    nrOfCheckedItems,
  } = CheckedItemsHelper(foodItems)

  //if all the items are checked and have prices, calculate the total price
  if (listCompletedWithAllItemsChecked) {
    //prettier-ignore

    const totalPrice = foodItems.reduce(
      (total, foodItem) => total + Number(foodItem.price),
      0
    )

    currentList.totalPrice = String(totalPrice > 0 ? totalPrice : '')
    listsCtx.updateList({
      updateTotalPrice: true,
      totalPrice: currentList.totalPrice,
      listId: currentList.id,
    })
  }
  // prettier-ignore
  // if list is completed, set canUpdateDate to false so the date will never be updated again
  if (isListCompleted && foodItems.length > 0 && currentList.canUpdateDate === true) {
    listsCtx.updateList({ listId: currentList.id, canUpdateDate: false })
  }

  return (
    <div>
      {foodItems && foodItems.length > 0 && (
        <div
          className={
            isListCompleted
              ? 'ml-4 flex items-center text-white bg-green-500/80 rounded pl-1 pr-1.5 py-1'
              : 'ml-4 flex items-center text-amber-300 rounded pl-1 pr-1.5 py-1'
          }
        >
          {isListCompleted ? (
            <CheckCircleIcon className='w-6 h-6 mr-0.5' />
          ) : (
            <ShoppingCartIcon className='w-6 h-6 mb-0.5 mr-1' />
          )}
          <p className=' text-2xl'>
            {nrOfCheckedItems}/{foodItems.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default ListCheckedStatus
