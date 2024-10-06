const Contract = require('../models/contract');
const User = require('../models/user');
require('../db/mongoose');

const HandleBuyBox = async function(data) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    let user = await User.findOne({ address: data.addressOfBuyer});
    if(!user) {
        user = new User({
            address: data.addressOfBuyer,
        });
    }

    if(data.isVip) {
        contract.amountBoxVip -= data.amountBoxBuy;
        user.amountBoxVip += data.amountBoxBuy;
    }   
    else {
        contract.amountBox -= data.amountBoxBuy;
        user.amountBox += data.amountBoxBuy;
    }
    await contract.save();
    await user.save();
}
module.exports = HandleBuyBox;