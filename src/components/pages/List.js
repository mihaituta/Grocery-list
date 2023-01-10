import { useParams } from 'react-router-dom'

const List = (props) => {
  const params = useParams()
  console.log(params)
  return (
    <>
      <div>{params.urlId}</div>
    </>
  )
}

export default List
