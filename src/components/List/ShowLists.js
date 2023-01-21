import { useNavigate } from 'react-router-dom'

const ShowLists = ({ listsCtx }) => {
  const navigate = useNavigate()

  const listRedirect = (list) => {
    listsCtx.setCurrentList({ list })
    navigate('/list/' + list.urlId)
  }

  const formattedDate = (list) => {
    const date = new Date(list)
    // prettier-ignore
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    /*    const addZeroBeforeSingleDIgitDay =
          date.getDate().toString().length === 1
            ? '0' + date.getDate()
            : date.getDate()*/

    // prettier-ignore
    return `${'(' + days[date.getDay()] + ') ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear().toString().slice(2)}`
  }

  return (
    <div className='grid grid-cols-2 gap-4 bg-zinc-900 m-4'>
      {listsCtx.lists &&
        listsCtx.lists.map((list) => (
          <div
            className='h-28	bg-zinc-800 rounded list-none cursor-pointer
             overflow-hidden overflow-ellipsis relative drop-shadow-md'
            key={list.id}
            onClick={() => listRedirect(list)}
          >
            <ul className='text-neutral-400 px-2 py-1 h-4/6	overflow-hidden overflow-ellipsis'>
              {list.foodItems.map((item, index) => (
                <li key={item.id} className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={item.checked}
                    readOnly
                    className='w-4 h-4 text-amber-400 mr-1.5 bg-transparent focus:ring-offset-0
                    border-amber-400/80 border-2 focus:ring-0 ring-0 rounded-full cursor-pointer'
                  />
                  <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {item.name + (index === 2 ? '...' : '')}
                  </div>
                </li>
              ))}
            </ul>
            <div className='text-amber-300 text-s absolute right-3 bottom-2'>
              {formattedDate(list.date)}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ShowLists
