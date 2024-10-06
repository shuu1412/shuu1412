const Contract = require('../models/contract')
require('../db/mongoose');

const HandleImcrementBox = async function(amount) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.amountBox += amount;
    await contract.save();
}
module.exports = HandleImcrementBox;    