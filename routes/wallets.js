// routes/wallets.js
import { Router } from 'express';
const router = Router();

import createWallet from '../controllers/wallets.js';

router.post('/', createWallet);

export default router;
