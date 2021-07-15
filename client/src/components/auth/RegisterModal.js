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
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { Alert } from 'reactstrap'

const RegisterModal = () => {
  const [modal, setModal] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const error = useSelector((state) => state.error)

  const toggle = () => {
    dispatch(clearErrors())
    setModal(!modal)
    setUsername('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
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
      case 'username':
        return setUsername(e.target.value)
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

    const newUser = {
      username,
      email,
      password,
    }

    dispatch(register(newUser))
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Create an account</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="mb-3"
                onChange={handleInput}
                autoFocus={true}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleInput}
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
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RegisterModal
