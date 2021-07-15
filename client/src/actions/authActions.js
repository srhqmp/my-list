import axios from 'axios'
import { returnErrors } from './errorActions'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types'

// check token and load user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  try {
    const response = await axios.get('/api/auth/user', tokenConfig(getState))
    dispatch({ type: USER_LOADED, data: response.data })
  } catch (e) {
    dispatch(returnErrors(e.response.data.message, e.response.status))
    dispatch({ type: AUTH_ERROR })
  }
}

// register user
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ username, email, password })

    try {
      const response = await axios.post('api/users', body, config)
      dispatch({ type: REGISTER_SUCCESS, data: response.data })
    } catch (e) {
      dispatch(
        returnErrors(
          e.response.data.message,
          e.response.status,
          'REGISTER_FAIL'
        )
      )
      dispatch({ type: REGISTER_FAIL })
    }
  }

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ email, password })
    try {
      const response = await axios.post('api/auth', body, config)
      dispatch({ type: LOGIN_SUCCESS, data: response.data })
    } catch (e) {
      dispatch(
        returnErrors(e.response.data.message, e.response.status, 'LOGIN_FAIL')
      )
      dispatch({ type: LOGIN_FAIL })
    }
  }

export const logout = () => (dispatch) => {
  return dispatch({
    type: LOGOUT_SUCCESS,
  })
}

// setup config/headers and token
export const tokenConfig = (getState) => {
  // get token from local storage
  const token = getState().auth.token

  // header
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  }

  if (token) {
    config.headers['x-auth-token'] = token
  }

  return config
}
