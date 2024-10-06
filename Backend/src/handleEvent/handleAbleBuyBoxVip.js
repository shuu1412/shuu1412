const Contract = require('../models/contract')
require('../db/mongoose');

const  HandleAbleBuyBoxVip = async function(res, blockNumber) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    if(blockNumber > contract.blockNumberAbleBuyBoxVip) {
        contract.blockNumberAbleBuyBoxVip = blockNumber;
        contract.ableBuyBoxVip = res;
    }
    await contract.save();
}

module.exports = HandleAbleBuyBoxVip;