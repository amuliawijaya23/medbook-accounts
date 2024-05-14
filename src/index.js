import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import dotenv from 'dotenv';
import dbConnect from './db/index.js';

import router from './routers/index.js';

dotenv.config();

const PORT = process.env.PORT;

const MONGODB_URL = process.env.MONGODB_URL;

dbConnect(MONGODB_URL);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
