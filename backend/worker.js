import { Worker } from 'bullmq';
import { Server } from 'socket.io';

// Dummy Socket.IO instance
const io = new Server(); // Attach this to your main app in production

const notificationWorker = new Worker(
  'myqueue',
  async (job) => {
    const { name, data } = job;

    if (name === 'notification') {
      const { message, userId } = data;

      // Check if the user is online
      const sockets = io.sockets.adapter.rooms.get(userId);
      const isOnline = sockets && sockets.size > 0;

      if (isOnline) {
        io.to(userId).emit('message', message);
        console.log(`Notification sent to user: ${userId}`);
      } else {
        console.log(`User ${userId} is offline. Retrying notification...`);
        throw new Error('User is offline');
      }
    } else if (name === 'broadcast') {
      const { message } = data;

      // Broadcast to all connected users
      io.emit('broadcast', message);
      console.log(`Broadcast message sent: ${message}`);
    }
  },
  {
    connection: { host: '127.0.0.1', port: 6379 }, // Redis connection config
  }
);

// Handle job failures
notificationWorker.on('failed', (job, err) => {
  console.error(`Job failed:`, err);
});

// Log successful job completion
notificationWorker.on('completed', (job) => {
  console.log(`Job completed:`, job.id);
});
