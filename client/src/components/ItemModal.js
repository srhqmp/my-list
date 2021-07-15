import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../actions/itemActions'

const ItemModal = () => {
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const toggle = () => setModal(!modal)

  const handleNameInput = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addItem(name))
    setName('')
    toggle()
  }

  return (
    <div>
      {auth.isLoading ? (
        ''
      ) : auth.isAuthenticated ? (
        <Button
          color="success"
          style={{ marginBottom: '2rem', marginLeft: '1rem' }}
          onClick={toggle}
        >
          Add Item
        </Button>
      ) : (
        <div style={{ marginBottom: '2rem', marginLeft: '1rem' }}>
          Login to add your to-do's
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle} autoFocus={false}>
        <ModalHeader toggle={toggle}>Add your to-do's</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                id="item"
                placeholder="Add Item"
                onChange={handleNameInput}
                value={name}
                required
                autoFocus={true}
              />
              <Button color="success" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ItemModal
