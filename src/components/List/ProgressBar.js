const ProgressBar = ({ foodItems }) => {
  const progressBarValue = () => {
    const checkedItems =
      foodItems && foodItems.filter((item) => item.checked === true)
    if (foodItems) {
      const value = Math.round((checkedItems.length / foodItems.length) * 100)
      return checkedItems.length === 0 ? 0 : value
    }

    return 0
  }

  return (
    <>
      {foodItems && foodItems.length > 0 && (
        <div className='flex items-center mt-4 h-4 transition-width ease-in-out'>
          {progressBarValue() > 0 && (
            <p className='text-s font-semibold text-white'>
              {progressBarValue()}%
            </p>
          )}

          <div
            className={`${
              progressBarValue() > 0 ? 'ml-3' : ''
            } bg-neutral-900 rounded-full w-full h-3`}
          >
            <div
              className={`bg-amber-300 duration-300 text-center h-3 text-xs font-bold leading-none 
              ${
                progressBarValue() === 100 ? 'rounded-full' : 'rounded-l-full'
              }  `}
              style={{ width: `${progressBarValue()}%` }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProgressBar
