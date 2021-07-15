import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { loadUser } from './actions/authActions'
import Navigation from './components/Navigation'
import TodoList from './components/TodoList'

import ItemModal from './components/ItemModal'

import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <div className="App">
      <Navigation />
      <Container style={{ marginBottom: '120px' }}>
        <ItemModal />
        <TodoList />
        <Card
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <CardBody>
            <CardTitle tag="h5">
              My List by{' '}
              <CardLink
                href="https://github.com/srhqmp/"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                srhqmp
              </CardLink>
            </CardTitle>

            <CardText>
              <small className="text-muted">2021</small>
            </CardText>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default App
