const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

const deliveryRoutes = require('./routes/deliveryRoutes');

app.use('/api/delivery', deliveryRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', async ({ room, sender, message }) => {
    io.to(room).emit('newMessage', { sender, message });
  });

  socket.on('sendPrivateMessage', async ({ sender, receiver, message }) => {
    console.log(sender, receiver, message)
    io.to(receiver).emit('newPrivateMessage', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));