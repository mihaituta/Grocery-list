export default function AppReducer(state, action) {
  switch (action.type) {
    case 'GET_LISTS':
      return {
        ...state,
        lists: [...state.lists, ...action.payload],
      }

    case 'SET_CURRENT_LIST':
      if (action.payload.list) {
        return {
          ...state,
          currentList: action.payload.list,
        }
      } else if (action.payload.urlId) {
        return {
          ...state,
          currentList: state.lists.find(
            (list) => list.urlId === action.payload.urlId
          ),
        }
      }
      return {
        ...state,
      }

    case 'ADD_LIST':
      return {
        ...state,
        lists: [action.payload, ...state.lists],
      }

    case 'UPDATE_LIST':
      const listsAfterUpdate = [
        ...state.lists.map((list) =>
          list.id !== action.payload.id ? list : { ...list, ...action.payload }
        ),
      ]
      const sortedListsByDate = listsAfterUpdate.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      return {
        ...state,
        // find the list in array and replace it with the new one
        lists: sortedListsByDate,
      }

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      }

    case 'TOGGLE_FOODITEM_CHECKBOX': {
      const list = state.lists.find((list) => list.id === action.payload.listId)

      // updating the list's food items with the updated checked items
      list.foodItems = action.payload.list

      return {
        ...state,
      }
    }

    case 'REORDER_LIST_ITEMS': {
      const list = state.lists.find((list) => list.id === action.payload.listId)
      console.log('list', list)
      console.log('listid', action.payload.listId)
      list.foodItems = action.payload.list

      return {
        ...state,
      }
    }

    case 'UPDATE_DATE': {
      const list = state.lists.find((list) => list.id === action.payload.listId)
      list.canUpdateDate = false
      list.date = new Date().toISOString()
      return {
        ...state,
      }
    }

    case 'UNSUBSCRIBE_LISTENER':
      return {
        ...state,
        unsubscribeListsListener: action.payload,
      }

    case 'CLEAR_DATA':
      return {
        ...state,
        lists: [],
      }

    default:
      return state
  }
}
