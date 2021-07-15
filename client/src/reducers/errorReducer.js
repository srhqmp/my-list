import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
  message: {},
  status: null,
  id: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.data.message,
        status: action.data.status,
        id: action.data.id,
      }
    case CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null,
      }
    default:
      return state
  }
}

export default reducer
