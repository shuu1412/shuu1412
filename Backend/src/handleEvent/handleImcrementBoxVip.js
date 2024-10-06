const Contract = require('../models/contract')
require('../db/mongoose');

const HandleImcrementBoxVip = async function(amount) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.amountBoxVip += amount;
    await contract.save();
}
module.exports = HandleImcrementBoxVip;