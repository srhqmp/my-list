import axios from 'axios'
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from '../actions/types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading())
  try {
    axios.get('/api/items').then((res) =>
      dispatch({
        type: GET_ITEMS,
        data: res.data,
      })
    )
  } catch (e) {
    return dispatch(returnErrors(e.response.data, e.response.status))
  }
}

export const addItem = (name) => (dispatch, getState) => {
  dispatch(setItemsLoading())
  try {
    axios.post('/api/items', { name }, tokenConfig(getState)).then((res) =>
      dispatch({
        type: ADD_ITEM,
        data: res.data,
      })
    )
  } catch (e) {
    return dispatch(returnErrors(e.response.data, e.response.status))
  }
}

export const deleteItem = (id) => (dispatch, getState) => {
  dispatch(setItemsLoading())
  try {
    axios.delete(`/api/items/${id}`, tokenConfig(getState)).then((res) =>
      dispatch({
        type: DELETE_ITEM,
        data: { id },
      })
    )
  } catch (e) {
    return dispatch(returnErrors(e.response.data, e.response.status))
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  }
}
