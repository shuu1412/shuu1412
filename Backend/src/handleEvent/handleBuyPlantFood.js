const Contract = require('../models/contract');
const User = require('../models/user');
require('../db/mongoose');

const HandleBuyPlantFood = async function(data) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    let user = await User.findOne({ address: data.addressOfBuyer});
    console.log("hhhhhhhhhhhhhhhhhhhhh------------>" +user);
    if(!user) {
        user = new User({
            address: data.addressOfBuyer,
        });
    }
    contract.amountPlantFood -= data.amountPlantFoodBuy;
    user.amountPlantFood += data.amountPlantFoodBuy;
    await contract.save();
    await user.save();
}
module.exports = HandleBuyPlantFood;