const Contract = require('../models/contract')
require('../db/mongoose');

const HandleUpdatePriceOfPlantFood = async function(price) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.priceOfPlantFood = price;
    await contract.save();
}

module.exports = HandleUpdatePriceOfPlantFood;