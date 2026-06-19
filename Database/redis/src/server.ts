import express from 'express';
import routes from './routes.ts';

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log("Server running on localhost:3333");
});

// import { createClient } from 'redis';

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();