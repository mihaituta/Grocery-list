const LoadingDataPlaceholder = ({
  loadingLists,
  data,
  dataLoadingMessage,
  noDataMessage,
}) => {
  return loadingLists ? (
    <div className='flex flex-col items-center justify-center mt-6'>
      <div
        className='w-12 h-12 rounded-full animate-spin border-4 border-solid
           border-amber-300 border-t-transparent'
      />
      <div className='text-xl text-amber-300 mt-5'>{dataLoadingMessage}</div>
    </div>
  ) : data.length === 0 ? (
    <div className='text-xl text-amber-300 mt-4 mx-4'>{noDataMessage}</div>
  ) : (
    ''
  )
}

export default LoadingDataPlaceholder
