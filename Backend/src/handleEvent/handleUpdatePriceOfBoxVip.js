const Contract = require('../models/contract')
require('../db/mongoose');

const HandleUpdatePriceOfBoxVip = async function(price) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.priceOfBoxVip = price;
    await contract.save();
}

module.exports = HandleUpdatePriceOfBoxVip;