import { GET_ERRORS, CLEAR_ERRORS } from './types'

// return errors
export const returnErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS,
    data: { message, status, id },
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  }
}
