import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from '../actions/types'

const initialState = {
  items: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.data,
        loading: false,
      }
    case ADD_ITEM: {
      return {
        ...state,
        items: [action.data, ...state.items],
        loading: false,
      }
    }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.data.id),
        loading: false,
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default reducer
