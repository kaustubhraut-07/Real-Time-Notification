
// import express from 'express';
// import { createServer } from 'node:http';
// import { join } from 'node:path';
// import { Server } from 'socket.io';
// import { createClient } from 'redis';
// import { createAdapter } from '@socket.io/redis-adapter';
// import cors from 'cors';

// const app = express();
// app.use(cors({ origin: 'http://localhost:5173' }));

// const server = createServer(app);

// const localDomains = [
//   'http://localhost:3000',
// ];

// const io = new Server(server, {
//   cors: {

//     origin: 'http://localhost:5173',


//   },
//   maxHttpBufferSize: 1e8,
// });   

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

// io.on('connection', (socket) => {
//   console.log('A new client connected');

//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//     io.emit('message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// let pubClient, subClient;

// (async () => {
//   pubClient = createClient({ url: "redis://localhost:6379" });
//   subClient = pubClient.duplicate();

//   pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
//   subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));

//   await Promise.all([pubClient.connect(), subClient.connect()]);

//   io.adapter(createAdapter(pubClient, subClient));

//   const port = process.env.PORT || 4000;
//   server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });


//   process.on('SIGINT', async () => {
//     console.log('SIGINT signal received.');
//     await shutdown();
//   });

//   process.on('SIGTERM', async () => {
//     console.log('SIGTERM signal received.');
//     await shutdown();
//   });
// })();

// async function shutdown() {
//   console.log('Shutting down server...');
//   io.close(() => {
//     console.log('Socket.IO server closed.');
//     server.close(async () => {
//       console.log('HTTP server closed.');
//       await pubClient.disconnect();
//       await subClient.disconnect();
//       console.log('Redis clients disconnected.');
//       process.exit(0);
//     });
//   });
// }



// import express from 'express';
// import { createServer } from 'node:http';
// import { join } from 'node:path';
// import { Server } from 'socket.io';
// import { createClient } from 'redis';
// import { createAdapter } from '@socket.io/redis-adapter';
// import cors from 'cors';

// const app = express();
// app.use(cors({ origin: 'http://localhost:5173' }));

// const server = createServer(app);

// const localDomains = [
//   'http://localhost:3000',
// ];

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//   },
//   maxHttpBufferSize: 1e8,
// });

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

// io.on('connection', (socket) => {
//   console.log('A new client connected');

//   socket.on('join', async (userId) => {
//     socket.join(userId);

//     // Fetch and send pending notifications
//     const notifications = await pubClient.lrange(`notifications:${userId}`, 0, -1);
//     notifications.forEach((notification) => {
//       socket.emit('message', notification);
//     });

//     // Remove the notifications from the list after sending
//     await pubClient.del(`notifications:${userId}`);
//   });

//   socket.on('message', async (data) => {
//     const { userId, message } = data;
//     console.log('Received message:', data);

//     // Publish the notification to the user's channel
//     await pubClient.publish(`user:${userId}`, message);

//     // If the user is not online, add the notification to the user's list
//     if (!io.sockets.adapter.rooms.get(`user:${userId}`)) {
//       await pubClient.rpush(`notifications:${userId}`, message);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// let pubClient, subClient;

// (async () => {
//   pubClient = createClient({ url: "redis://localhost:6379" });
//   subClient = pubClient.duplicate();

//   pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
//   subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));

//   await Promise.all([pubClient.connect(), subClient.connect()]);

//   io.adapter(createAdapter(pubClient, subClient));

//   const port = process.env.PORT || 4000;
//   server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });

//   process.on('SIGINT', async () => {
//     console.log('SIGINT signal received.');
//     await shutdown();
//   });

//   process.on('SIGTERM', async () => {
//     console.log('SIGTERM signal received.');
//     await shutdown();
//   });
// })();

// async function shutdown() {
//   console.log('Shutting down server...');
//   io.close(() => {
//     console.log('Socket.IO server closed.');
//     server.close(async () => {
//       console.log('HTTP server closed.');
//       await pubClient.disconnect();
//       await subClient.disconnect();
//       console.log('Redis clients disconnected.');
//       process.exit(0);
//     });
//   });
// }










// import express from 'express';
// import { createServer } from 'node:http';
// import { join } from 'node:path';
// import { Server } from 'socket.io';
// import { createClient } from 'redis';
// import { createAdapter } from '@socket.io/redis-adapter';
// import cors from 'cors';

// const app = express();
// app.use(cors({ origin: 'http://localhost:5173' }));

// const server = createServer(app);

// const localDomains = [
//   'http://localhost:3000',
// ];

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//   },
//   maxHttpBufferSize: 1e8,
// });

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

// io.on('connection', (socket) => {
//   console.log('A new client connected');

//   socket.on('join', async (userId) => {
//     socket.join(userId);

//     // Fetch and send pending notifications
//     const notifications = await pubClient.sendCommand(['LRANGE', `notifications:${userId}`, 0, -1]);
//     notifications.forEach((notification) => {
//       socket.emit('message', notification);
//     });

//     // Remove the notifications from the list after sending
//     await pubClient.sendCommand(['DEL', `notifications:${userId}`]);
//   });

//   socket.on('message', async (data) => {
//     const { userId, message } = data;
//     console.log('Received message:', data);

//     // Publish the notification to the user's channel
//     await pubClient.publish(`user:${userId}`, message);

//     // If the user is not online, add the notification to the user's list
//     if (!io.sockets.adapter.rooms.get(`user:${userId}`)) {
//       await pubClient.sendCommand(['RPUSH', `notifications:${userId}`, message]);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// let pubClient, subClient;

// (async () => {
//   pubClient = createClient({ url: "redis://localhost:6379" });
//   subClient = pubClient.duplicate();

//   pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
//   subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));

//   await Promise.all([pubClient.connect(), subClient.connect()]);

//   io.adapter(createAdapter(pubClient, subClient));

//   const port = process.env.PORT || 4000;
//   server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });

//   process.on('SIGINT', async () => {
//     console.log('SIGINT signal received.');
//     await shutdown();
//   });

//   process.on('SIGTERM', async () => {
//     console.log('SIGTERM signal received.');
//     await shutdown();
//   });
// })();

// async function shutdown() {
//   console.log('Shutting down server...');
//   io.close(() => {
//     console.log('Socket.IO server closed.');
//     server.close(async () => {
//       console.log('HTTP server closed.');
//       await pubClient.disconnect();
//       await subClient.disconnect();
//       console.log('Redis clients disconnected.');
//       process.exit(0);
//     });
//   });
// }




// import express from 'express';
// import { createServer } from 'node:http';
// import { join } from 'node:path';
// import { Server } from 'socket.io';
// import { createClient } from 'redis';
// import { createAdapter } from '@socket.io/redis-adapter';
// import cors from 'cors';
// import { Queue, Worker } from 'bullmq'

// const app = express();
// app.use(cors({ origin: 'http://localhost:5173' }));

// const server = createServer(app);

// const localDomains = [
//   'http://localhost:3000',
// ];

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//   },
//   maxHttpBufferSize: 1e8,
// });

// const myQueue = new Queue('myqueue', { connection: {
//   host: "myredis.taskforce.run",
//   port: 32856
// }});

// const myWorker = new Worker('myqueue', async (job)=>{}, { connection: {
//   host: "myredis.taskforce.run",
//   port: 32856
// }});

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

// const redisClient = createClient({ url: "redis://localhost:6379" });
// // const queue = new Queue('message_queue', redisClient);


// io.on('connection', (socket) => {
//   console.log('A new client connected');

//   socket.on('join', async (userId) => {
//     socket.join(userId);

//     // Fetch and send pending notifications
//     // const notifications = await redisClient.lPush(['LRANGE', `notifications:${userId}`, 0, -1]);
//     const myQueue = new Queue('myqueue', { connection });
//     const notifications = await myQueue.add("" , socket.message);

//     notifications.forEach((notification) => {
//       socket.emit('message', notification);
//     });

//     // Remove the notifications from the list after sending
//     await redisClient.rPop(['DEL', `notifications:${userId}`]);
//   });

//   socket.on('message', async (data) => {
//     const { userId, message } = data;
//     console.log('Received message:', data);

//     // Add message to queue
//     // await queue.enqueue({ userId, message });
    

//     // Process queue
//     processQueue();
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// async function processQueue() {
//   // Dequeue message
//   const message = await queue.dequeue();

//   if (message) {
//     const { userId, message: msg } = message;

//     // Publish the notification to the user's channel
//     await redisClient.publish(`user:${userId}`, msg);

//     // If the user is not online, add the notification to the user's list
//     if (!io.sockets.adapter.rooms.get(`user:${userId}`)) {
//       await redisClient.sendCommand(['RPUSH', `notifications:${userId}`, msg]);
//     }
//   }
// }

// redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// (async () => {
//   await redisClient.connect();

//   const port = process.env.PORT || 4000;
//   server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });

//   process.on('SIGINT', async () => {
//     console.log('SIGINT signal received.');
//     await shutdown();
//   });

//   process.on('SIGTERM', async () => {
//     console.log('SIGTERM signal received.');
//     await shutdown();
//   });
// })();

// async function shutdown() {
//   console.log('Shutting down server...');
//   io.close(() => {
//     console.log('Socket.IO server closed.');
//     server.close(async () => {
//       console.log('HTTP server closed.');
//       await redisClient.disconnect();
//       console.log('Redis client disconnected.');
//       process.exit(0);
//     });
//   });
// }


// import express from 'express';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import http from 'http';
// import { Queue } from 'bullmq';


// const app = express();
// app.use(express.json());
// const server = http.createServer(app);
// const myQueue = new Queue('myqueue');

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173', 

//   },
// });

// const PORT = 4000;

// app.use(cors());


// const notifications = [];

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on('join', (userId) => {
//     console.log(`User joined: ${userId}`);
//     socket.join(userId);

//     // notifications
//     //   .filter((n) => n.userId === userId)
//     //   .forEach((notification) => {
//     //     socket.emit('message', notification.message);
//     //   });
//        myQueue.add('message' , socket.message);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });


// app.post('/notify', (req, res) => {
//   const { message, userId } = req.body; 
//   if (!message || !userId) {
//     return res.status(400).send({ error: 'Message and userId are required' });
//   }

//   // notifications.push({ id: Date.now(), message, userId });
//   myQueue.add( 'notification' , {id: Date.now(), message, userId });
//   io.to(userId).emit('message', message);
//   res.status(200).send({ success: true });
// });

// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import { Queue } from 'bullmq';

const app = express();
app.use(express.json());
const server = http.createServer(app);
const myQueue = new Queue('myqueue', {
  connection: { host: '127.0.0.1', port: 6379 }, // Redis config
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

const PORT = 4000;

app.use(cors());

// Track connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins with their userId
  socket.on('join', (userId) => {
    console.log(`User joined: ${userId}`);
    connectedUsers.set(userId, socket.id); // Map userId to socket.id
    socket.join(userId); // Add user to their own room
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    connectedUsers.forEach((id, userId) => {
      if (id === socket.id) connectedUsers.delete(userId);
    });
  });
});

// Endpoint to send notifications to a specific user
app.post('/notify', async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).send({ error: 'Message and userId are required' });
  }

  try {
    await myQueue.add('notification', { message, userId }, { attempts: 5, backoff: 5000 });
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Failed to add job to queue:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Endpoint to broadcast notifications to all users
app.post('/broadcast', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    await myQueue.add('broadcast', { message }, { attempts: 5, backoff: 5000 });
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Failed to add broadcast job:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

