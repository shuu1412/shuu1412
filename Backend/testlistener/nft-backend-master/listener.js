const Web3 = require('web3')
require('dotenv').config()
const marketAbi = require('./contracts/marketplace.json')
const fs = require('fs')
const marketAddress = process.env.MARKET_ADDRESS
const web3 = new Web3(process.env.WEB3_ENDPOINT)
const marketContract = new web3.eth.Contract(marketAbi, marketAddress)

//topics
const OrderAdded = 'OrderAdded'
const OrderMatched = 'OrderMatched'
const OrderCancelled = 'OrderCancelled
var lastBlock = process.env.LAST_BLOCK
function saveConfig() {
    var data = fs.readFileSync('.env', { encoding: 'utf8', flag: 'r' });
    data = data.replace('LAST_BLOCK=' + process.env.LAST_BLOCK, 'LAST_BLOCK=' + lastBlock)
    fs.writeFileSync(".env", data);
}
function callMessageBus(api, data) {
    console.log("api: ", api)
    console.log("data: ", data)
}
async function getEvent() {
    var toBlock = await web3.eth.getBlockNumber() * 1
    if (toBlock - lastBlock > 4000) {
        toBlock = lastBlock * 1 + 4000
    }
    marketContract.getPastEvents(OrderAdded, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        
        for (let i = 0; i < result.length; i++) {

            var data = {
                'event': result[i].event,
                'orderId': result[i].returnValues.orderId,
                'seller:': result[i].returnValues.seller,
                'tokenId:': result[i].returnValues.tokenId,
                'paymentToken:': result[i].returnValues.paymentToken,
                'blockNumber:': result[i].blockNumber,
                'transactionHash': result[i].transactionHash,
            }
            callMessageBus('add-order', data)
        }
    })

    marketContract.getPastEvents(OrderMatched, { fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        for (let i = 0; i < result.length; i++) {

            var data = {
                'event': result[i].event,
                'orderId': result[i].returnValues.orderId,
                'seller:': result[i].returnValues.seller,
                'buyer:': result[i].returnValues.buyer,
                'tokenId:': result[i].returnValues.tokenId,
                'paymentToken:': result[i].returnValues.paymentToken,
                'blockNumber:': result[i].blockNumber,
                'transactionHash': result[i].transactionHash,
            }
            callMessageBus('match-order', data)
        }
    })
    marketContract.getPastEvents(OrderCancelled, { fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        for (let i = 0; i < result.length; i++) {

            var data = {
                'event': result[i].event,
                'orderId': result[i].returnValues.orderId,
                'blockNumber:': result[i].blockNumber,
                'transactionHash': result[i].transactionHash,
            }
            callMessageBus('cancel-order', data)
        }
    })
    lastBlock = toBlock + 1
    saveConfig()
}
setInterval(async function () {
    await getEvent()
}, 2000)
