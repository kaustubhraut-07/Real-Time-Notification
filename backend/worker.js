


import { Worker } from 'bullmq';
import { createClient } from 'redis';

const redisClient = createClient({ url: 'redis://127.0.0.1:6379' });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();

const notificationWorker = new Worker(
  'myqueue',
  async (job) => {
    console.log('Processing job:', job.data);

    const { userId, message } = job.data;

    // Publish the message to the user's channel
    const userChannel = "notification-app";
    redisClient.publish(userChannel, JSON.stringify({ message }));

    console.log(`Notification sent to user: ${userId}`);
  },
  {
    connection: { host: '127.0.0.1', port: 6379 },
  }
);

notificationWorker.on('failed', (job, err) => {
  console.error(`Job failed with id ${job.id}:`, err);
});

notificationWorker.on('completed', (job) => {
  console.log(`Job completed:`, job.id);
});

