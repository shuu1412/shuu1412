const Contract = require('../models/contract')
require('../db/mongoose');

const HandlePaused = async function(res, blockNumber) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    if(blockNumber > contract.blockNumberPause) {
        contract.blockNumberPause = blockNumber;
        contract.paused = res;
    }
    await contract.save();
}

module.exports = HandlePaused;