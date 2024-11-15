
import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

const server = createServer(app);

const localDomains = [
  'http://localhost:3000',
];

const io = new Server(server, {
  cors: {

    origin: 'http://localhost:5173',


  },
  maxHttpBufferSize: 1e8,
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A new client connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

let pubClient, subClient;

(async () => {
  pubClient = createClient({ url: "redis://localhost:6379" });
  subClient = pubClient.duplicate();

  pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
  subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io.adapter(createAdapter(pubClient, subClient));

  const port = process.env.PORT || 4000;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


  process.on('SIGINT', async () => {
    console.log('SIGINT signal received.');
    await shutdown();
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received.');
    await shutdown();
  });
})();

async function shutdown() {
  console.log('Shutting down server...');
  io.close(() => {
    console.log('Socket.IO server closed.');
    server.close(async () => {
      console.log('HTTP server closed.');
      await pubClient.disconnect();
      await subClient.disconnect();
      console.log('Redis clients disconnected.');
      process.exit(0);
    });
  });
}
