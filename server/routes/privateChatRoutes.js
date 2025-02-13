const PrivateChat = require('../models/PrivateChat');
const express = require('express');
const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const privateChat = new PrivateChat({ sender, receiver, message });
    await privateChat.save();
    res.status(201).json(privateChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  const chats = await PrivateChat.find({
    $or: [{ sender: req.params.userId }, { receiver: req.params.userId }]
  });
  res.json(chats);
});
module.exports = router;