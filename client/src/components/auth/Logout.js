import React from 'react'
import { NavLink } from 'reactstrap'
import { logout } from '../../actions/authActions'
import { useDispatch } from 'react-redux'

const Logout = () => {
  const dispatch = useDispatch()
  return (
    <NavLink onClick={() => dispatch(logout())} href="#">
      Logout
    </NavLink>
  )
}

export default Logout
