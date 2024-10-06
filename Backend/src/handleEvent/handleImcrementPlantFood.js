const Contract = require('../models/contract')
require('../db/mongoose');

const HandImcrementPlantFood = async function(amount) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.amountPlantFood += amount;
    await contract.save();
}
module.exports = HandImcrementPlantFood;