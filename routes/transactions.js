import express from 'express';
const router = express.Router();

import Transactions from '../controllers/transactions.js';

router.post('/transfer', Transactions.transfer);

export default router;