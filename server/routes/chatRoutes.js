const express = require("express")
const router = express.Router();
const Chat = require('../models/Chat');
router.get('/:room', async (req, res) => {
  const chats = await Chat.find({ room: req.params.room });
  res.json(chats);
});
module.exports = router;