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
      return {
        ...state,
        // find the board in array and replace it with the new one
        lists: [
          ...state.lists.map((list) =>
            list.id !== action.payload.id
              ? list
              : { ...list, ...action.payload }
          ),
        ],
      }

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
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
