import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ListsContext } from '../../store/ListsContextProvider'

const List = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const listsCtx = useContext(ListsContext)

  const deleteList = () => {
    listsCtx.deleteList(listsCtx.currentList.id)
    navigate('/')
  }

  const show = () => {
    console.log(listsCtx.lists)
    console.log(listsCtx.currentList)
  }

  useEffect(() => {
    listsCtx.setCurrentList({ urlId: params.urlId })
    return () => {
      listsCtx.setCurrentList({ list: {} })
      console.log('lists')
      console.log(listsCtx.lists)

      console.log(`current list`)
      console.log(listsCtx.currentList)
    }
  }, [listsCtx.lists, listsCtx.currentList])

  /*  const foodItems = (
     <ul className='mt-2'>
       {items.map((item, index) => (
         <li key={index}>
           <label className='inline-flex items-center bg-zinc-500 mt-2 p-2 w-full'>
             <input
               className='w-8 h-8 text-green-600 focus:border-none border-none focus:ring-0 ring-0 rounded-full'
               type='checkbox'
               id={`checkbox-${index}`}
               name={item}
             />
             <label
               className='ml-3 text-2xl font-semibold text-white'
               htmlFor={`checkbox-${index}`}
             >
               {item}
             </label>
           </label>
         </li>
       ))}
     </ul>
   )*/
  return (
    <>
      <div className='text-white'>{params.urlId}</div>
      <div className='flex flex-col items-start'>
        <button className='text-white' onClick={deleteList}>
          Delete
        </button>
        <button className='text-white' onClick={show}>
          Show list
        </button>
      </div>
    </>
  )
}

export default List
