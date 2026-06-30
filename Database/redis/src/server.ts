import express from 'express';
import routes from './routes.ts';
import client from './client.ts';
// Docs 
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.ts';

const app = express();

app.get('/swagger.json', (_req, res) => {
  res.json(swaggerDocument);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);
client.set('my_key', 'Hello, Redis!');

app.listen(3333, () => {
  console.log("Server running on localhost:3333");
  console.log("Swagger UI available at http://localhost:3333/api-docs");
});

