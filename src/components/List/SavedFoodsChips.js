import { PlusIcon } from '@heroicons/react/24/solid'

const SavedFoodsChips = ({
  listPage,
  itemNameRef,
  filteredFoods,
  addFoodItemHandler,
}) => {
  return (
    <>
      {/*CHIPS RECOMMENDATIONS*/}
      {listPage && itemNameRef.current.value && (
        <div className='flex flex-wrap gap-0 '>
          {filteredFoods &&
            filteredFoods.slice(0, 5).map((foodName) => (
              <div className='flex flex-wrap mr-3 mb-4' key={foodName}>
                <span
                  className='pl-3 pr-1.5 py-1.5 rounded-md text-zinc-900 bg-amber-300
          font-semibold flex items-center cursor-pointer
           active:bg-amber-200 transition duration-300 ease-out'
                  onClick={(e) => addFoodItemHandler(e, foodName)}
                >
                  {foodName}
                  <PlusIcon className='w-5 h-5 ml-2 text-zinc-900' />
                </span>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default SavedFoodsChips
