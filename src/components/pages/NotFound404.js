import { useNavigate } from 'react-router-dom'

const NotFound404 = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='flex flex-col items-center place-content-center justify-center h-screen	py-2'>
        <div className='text-9xl font-semibold'>404</div>
        <div className='text-xl font-medium'>Oops. Nothing here...</div>
        <button
          onClick={() => {
            navigate('/')
          }}
          className='border w-40 bg-blue-600 hover:bg-blue-500 w- p-4 my-2 text-white'
        >
          Go home
        </button>
      </div>
    </>
  )
}

export default NotFound404
