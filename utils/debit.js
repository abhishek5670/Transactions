import Wallets from '../models/wallets.js';
import Transactions from '../models/transactions.js';
const debitAccount = async ({amount, username, purpose, reference, summary, trnxSummary, session}) => {
    const wallet = await Wallets.findOne({username});
    if (!wallet) {
      return {
        status: false,
        statusCode:404,
        message: `User ${username} doesn\'t exist`
      }
    };
  
    if (Number(wallet.balance) < amount) {
      return {
        status: false,
        statusCode:400,
        message: `User ${username} has insufficient balance`
      }
    }
  
    const updatedWallet = await Wallets.findOneAndUpdate({username}, { $inc: { balance: -amount } }, {session});
    const transaction = await Transactions.create([{
      trnxType: 'DR',
      purpose,
      amount,
      username,
      reference,
      balanceBefore: Number(wallet.balance),
      balanceAfter: Number(wallet.balance) - Number(amount),
      summary,
      trnxSummary
    }], {session});
  
    console.log(`Debit successful`);
    return {
      status: true,
      statusCode:201,
      message: 'Debit successful',
      data: {updatedWallet, transaction}
    }
  }
  
  export default  debitAccount;