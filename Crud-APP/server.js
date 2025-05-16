const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST new item
router.post('/', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  const item = await newItem.save();
  res.json(item);
});

// PUT update item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE item by ID
router.delete('/:id', async (req, res) => {
  const result = await Item.findByIdAndDelete(req.params.id);
  res.json({ success: !!result });
});

module.exports = router;
