import express from 'express';
import routes from './routes.ts';
import client from './client.ts';

const app = express();

app.use(routes);
client.set('my_key', 'Hello, Redis!');

app.listen(3333, () => {
  console.log("Server running on localhost:3333");
});
