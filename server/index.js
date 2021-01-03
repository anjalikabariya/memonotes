import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import noteRoutes from './routes/notes.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('hello to first app');
});

const PORT = process.env.PORT|| 5000;
const CONNECTION_URL = 'mongodb+srv://appuser:appuser@cluster0.ehsl0.mongodb.net/Memonotes?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);