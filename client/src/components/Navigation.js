import React, { useState, useEffect } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavbarText,
  NavLink,
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'

import { useSelector } from 'react-redux'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [user, setUser] = useState(null)
  const auth = useSelector((state) => state.auth)
  useEffect(() => {
    if (auth.isAuthenticated) {
      setUser({ user: auth.user, isAuthenticated: auth.isAuthenticated })
    } else {
      setUser(null)
    }
  }, [auth])

  const userLinks = (
    <>
      <NavbarText className="navbar-text mr-3">
        <strong>{!user ? '' : `welcome ${user.user.username}!  `}</strong>
      </NavbarText>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  )

  const guessLinks = (
    <>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </>
  )

  return (
    <div>
      <Navbar color="warning" light expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">My List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              {auth.isLoading
                ? ''
                : user && auth.isAuthenticated
                ? userLinks
                : guessLinks}
              <NavItem>
                <NavLink
                  href="https://github.com/srhqmp/my-list"
                  target={'_blank'}
                >
                  View Code
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation
