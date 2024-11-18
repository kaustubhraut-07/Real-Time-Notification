
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import { Queue } from 'bullmq';

const app = express();
app.use(express.json());
const server = http.createServer(app);
const myQueue = new Queue('myqueue', {
  connection: { host: '127.0.0.1', port: 6379 }, 
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

const PORT = 4000;

app.use(cors());

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (userId) => {
    console.log(`User joined: ${userId}`);
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.post('/notify', async (req, res) => {
  const { message, userId } = req.body;
  if (!message || !userId) {
    return res.status(400).send({ error: 'Message and userId are required' });
  }

  try {
    await myQueue.add('notification', { id: Date.now(), message, userId });
    console.log('Job added to queue:', { message, userId });

  
    io.to(userId).emit('message', message);

    res.status(200).send({ success: true });
  } catch (err) {
    console.error('Failed to add job to queue:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
