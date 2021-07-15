import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { Alert } from 'reactstrap'

const LoginModal = () => {
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const error = useSelector((state) => state.error)

  const toggle = () => {
    dispatch(clearErrors())
    setModal(!modal)
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMessage(error.message)
    } else {
      setMessage(null)
    }
  }, [error])

  useEffect(() => {
    if (modal) {
      if (auth.isAuthenticated) {
        toggle()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  const handleInput = (e) => {
    switch (e.target.name) {
      case 'email':
        return setEmail(e.target.value)
      case 'password':
        return setPassword(e.target.value)
      default:
        return
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password,
    }
    dispatch(login(user))
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>User Login</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleInput}
                autoFocus={true}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleInput}
              />
              <Button color="success" style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default LoginModal
