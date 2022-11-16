import Wallets from '../models/wallets.js';
import Transactions from '../models/transactions.js';

const creditAccount = async ({amount, username, purpose, reference, summary, trnxSummary, session}) => {
  const wallet = await Wallets.findOne({username});
  if (!wallet) {
    return {
      status: false,
      statusCode:404,
      message: `User ${username} doesn\'t exist`
    }
  };

  const updatedWallet = await Wallets.findOneAndUpdate({username}, { $inc: { balance: amount } }, {session});

  const transaction = await Transactions.create([{
    trnxType: 'CR',
    purpose,
    amount,
    username,
    reference,
    balanceBefore: Number(wallet.balance),
    balanceAfter: Number(wallet.balance) + Number(amount),
    summary,
    trnxSummary
  }], {session});

  console.log(`Credit successful`)
  return {
    status: true,
    statusCode:201,
    message: 'Credit successful',
    data: {updatedWallet, transaction}
  }
}

export default creditAccount;