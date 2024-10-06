const Contract = require('../models/contract')
require('../db/mongoose');

const HandleUpdatePriceOfBox = async function(price) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.priceOfBox = price;
    await contract.save();
}

module.exports = HandleUpdatePriceOfBox;