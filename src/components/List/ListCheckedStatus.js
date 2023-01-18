import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const ListCheckedStatus = ({ foodItems, currentList, listsCtx }) => {
  // prettier-ignore
  const nrOfCheckedItems =
            foodItems &&
            foodItems.reduce((nrOfChecks, foodItem) => nrOfChecks + (foodItem.checked === true), 0)

  const completed = foodItems && nrOfCheckedItems === foodItems.length

  // if list is completed, set canUpdateDate to false so the date will never be updated again
  // prettier-ignore
  if (completed && foodItems.length > 0 && currentList.canUpdateDate === true
        ) {
            listsCtx.updateList({ listId: currentList.id, canUpdateDate: false })
        }

  return (
    <div>
      {foodItems && foodItems.length > 0 && (
        <div
          className={
            completed
              ? 'ml-4 flex items-center text-white bg-green-500/80 rounded pl-1 pr-1.5 py-1'
              : 'ml-4 flex items-center text-amber-300 rounded pl-1 pr-1.5 py-1'
          }
        >
          {completed ? (
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
