import { Worker } from 'bullmq';
import { Server } from 'socket.io';


const io = new Server(); 


const notificationWorker = new Worker(
  'myqueue',
  async (job) => {
    console.log('Processing job:', job.data);

   
    const { userId, message } = job.data;

   
    io.to(userId).emit('message', message);

    console.log(`Notification sent to user: ${userId}`);
  },
  {
    connection: { host: '127.0.0.1', port: 6379 },
  }
);

notificationWorker.on('failed', (job, err) => {
  console.error(`Job failed with id ${job.id}:`, err);
});
