import express from 'express';
import consign from 'consign';
import { urlencoded, json } from 'body-parser';
import expressValidator from 'express-validator';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(urlencoded({extended: false}));
app.use(json());
app.use(expressValidator());

consign().include('routes').include('utils').into(app);

app.listen(port, hostname, ()=>{

  console.log(`server running on port ${port}!`);

});
