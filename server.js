import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logEvents, logger } from './middleware/logger.js';
import errorHandler from './middleware/errorHandle.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import connectDB from './config/dbConn.js';
import mongoose from 'mongoose';

import rootRoute from './routes/root.js';
import bookRoute from './routes/book.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

// app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Static Files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', rootRoute);
app.use('/v1', bookRoute);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log',
  );
});
