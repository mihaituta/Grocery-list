import React from 'react'

const ListsContext = React.createContext({
  lists: [],
  addList: (list) => {},
  deleteList: (id) => {},
})

export default ListsContext
