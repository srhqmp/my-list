import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'

const TodoList = () => {
  const items = useSelector(({ items }) => items.items)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const filteredItems = auth.isAuthenticated
    ? items.filter((item) => item.user === auth.user.id)
    : items

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="todo-list">
          {auth.isLoading
            ? ''
            : filteredItems &&
              filteredItems.map(({ id, name }) => (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {auth.isAuthenticated && (
                      <Button
                        className="remove-btn"
                        color="warning"
                        size="sm"
                        onClick={() => dispatch(deleteItem(id))}
                      >
                        set as done
                      </Button>
                    )}{' '}
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}

export default TodoList
