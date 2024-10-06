const Contract = require('./models/contract');
const User = require('./models/user');
require('./db/mongoose');

async function createContract()  {
    const contract = new Contract({
        address: '0xE51a538b7DE2d9A883C01476d285700c4dD12374',
        addressOwner: '0x7E53B30974EFEd9fc2689980007c363c8550517e',
        addressOfCoinUse: '0x6C4cfBC9C71A757A2599e632f0452936d69F87d4',
        addressOfBoxContract: '0xf69ff335f41d21f2CD042b5384751aB1D604f609',
        amountPlantFood: 0,
        amountBox: 0,
        amountBoxVip: 0,
        priceOfBox: 0,
        priceOfBoxVip: 0,
        priceOfPlantFood: 0,
        blockNumberPause: 0,
        blockNumberAbleBuyBoxVip: 0,
        ableBuyBoxVip: false,
        paused: false,
    })
    console.log('haha');
    try {
        await contract.save();
    } catch (error) {
        console.log(error);
    }
}


createContract();