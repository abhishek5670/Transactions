// wallets.js
import { Schema, Decimal128, model } from 'mongoose';

const walletSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
        unique: true
    },
    balance: {
        type:Decimal128,
        required: true,
        default: 0.00
    },

  },
  { timestamps: true }
);

const Wallets = model('Wallets', walletSchema);
export default Wallets;


