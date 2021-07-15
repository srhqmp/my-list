const express = require('express')
const itemsRouter = express.Router()
const auth = require('../../utils/middleware').auth

const Item = require('../../models/Item')

// @route   GET api/items
// @desc    Get all items
// @access  Public
itemsRouter.get('/', async (request, response) => {
  const items = await Item.find({}).sort({ date: -1 })
  return response.json(items)
})

// @route   POST api/items
// @desc    Create item
// @access  Private
itemsRouter.post('/', auth, async (request, response) => {
  console.log(request.user)

  const newItem = new Item({
    name: request.body.name,
    user: request.user.id,
  })

  const item = await newItem.save()
  console.log(item)
  return item ? response.json(item) : response.status(400).end()
})

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Private
itemsRouter.delete('/:id', auth, async (request, response) => {
  try {
    const item = await Item.findById(request.params.id)
    await item.remove()
    return response.json({ success: true })
  } catch (error) {
    return response.status(404).json({ success: false })
  }
})

module.exports = itemsRouter
