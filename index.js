// index.js
import express, { json } from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import walletRoutes from './routes/wallets.js';
import transactionRoutes from './routes/transactions.js';

config();

const app = express();
app.use(json());
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);

mongoose.connect('mongodb+srv://abhi123:Password%40123@cluster0.qbubzdd.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB');
  });

  app.get('/', (req, res) => {
    res.send('Server is ready');
  });
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
  });