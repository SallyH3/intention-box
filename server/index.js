import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Used to parse URL-encoded bodies
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);