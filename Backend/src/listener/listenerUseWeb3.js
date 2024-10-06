const Web3 = require('web3');
require('dotenv').config();
const plantVsZombieABI = require('./plantvsZombie.json');
const fs = require('fs');
const plantVsZombieAddress = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(process.env.WEB3_ENDPOINT);
const plantVsZombieContract = new web3.eth.Contract(plantVsZombieABI, plantVsZombieAddress);

const HandleBuyBox = require('../handleEvent/handleBuyBox');
const HandleImcrementBox = require('../handleEvent/handleImcrementBox');
const HandleImcrementBoxVip = require('../handleEvent/handleImcrementBoxVip');
const HandImcrementPlantFood = require('../handleEvent/handleImcrementPlantFood');
const HandleUpdatePriceOfBox = require('../handleEvent/handleUpdatePriceOfBox');
const HandleUpdatePriceOfBoxVip = require('../handleEvent/handleUpdatePriceOfBoxVip');
const HandleUpdatePriceOfPlantFood = require('../handleEvent/handleUpdatePriceOfPlantFood');
const HandleUnBox = require('../handleEvent/handleUnbox');
const HandleBuyPlantFood = require('../handleEvent/handleBuyPlantFood');
const HandleUsePlantFood = require('../handleEvent/handleUsePlantFood');
const HandlePaused = require('../handleEvent/handlePaused');
const HandleUpdateAddressOfCoinUse = require('../handleEvent/handleUpdateAddressOfCoinUse');
const HandleAbleBuyBoxVip = require('../handleEvent/handleAbleBuyBoxVip');
// topics
const Paused = 'Paused';
const Unpaused = 'Unpaused';
const ImcrementBox = 'ImcrementBox';
const ImcrementBoxVip = 'ImcrementBoxVip';
const ImcrementPlantFood = 'ImcrementPlantFood';
const UpdatePriceOfBox = 'UpdatePriceOfBox';
const UpdatePriceOfBoxVip = 'UpdatePriceOfBoxVip';
const UpdatePriceOfPlantFood = 'UpdatePriceOfPlantFood';
const UpdateAddressOfCoinUse = 'UpdateAddressOfCoinUse';
const AbleBuyBoxVip = 'AbleBuyBoxVip';
const UnableBuyBoxVip = 'UnableBuyBoxVip';
const UpdateAddressBoxUse = 'UpdateAddressBoxUse';
const BuyBox = 'BuyBox';
const BuyPlantFood = 'BuyPlantFood';
const UsePlantFood = 'UsePlantFood';
const UnBox = 'UnBox';
let preLastBlock = process.env.LAST_BLOCK;
let lastBlock = process.env.LAST_BLOCK;

function saveConfig() {
    let data = fs.readFileSync('.env', { encoding: 'utf8', flag: 'r' });
    data = data.replace('LAST_BLOCK=' + preLastBlock, 'LAST_BLOCK=' + lastBlock)
    preLastBlock = lastBlock;
    fs.writeFileSync('.env', data);
    console.log('.env last block  ' + process.env.LAST_BLOCK);
}

async function getEvent() {

    console.log(plantVsZombieAddress);
    console.log(process.env.LAST_BLOCK);
    let toBlock = await web3.eth.getBlockNumber() * 1;
    console.log("last block first  " + lastBlock + "    " +  "toblock fist  " + toBlock );
    if (toBlock - lastBlock > 4000) {
        toBlock = lastBlock * 1 + 4000
    }
    console.log("last block  " + lastBlock +  "    " + "to block  " + toBlock );

    if(lastBlock > toBlock) {
        console.log('waiting for new block ........');
    }

    plantVsZombieContract.getPastEvents(Paused, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            await HandlePaused(true, result[i].blockNumber);
        }
    })

    plantVsZombieContract.getPastEvents(Unpaused, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            await HandlePaused(false, result[i].blockNumber);
        }
    })

    plantVsZombieContract.getPastEvents(AbleBuyBoxVip, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            HandleAbleBuyBoxVip(true, result[i].blockNumber);
        }
    })

    plantVsZombieContract.getPastEvents(UnableBuyBoxVip, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            HandleAbleBuyBoxVip(false, result[i].blockNumber);
        }
    })
    plantVsZombieContract.getPastEvents(UpdateAddressOfCoinUse, {  fromBlock: lastBlock, toBlock: toBlock }, async(err, result) => {
        if (err) {
            return
        }
        
        for (let i = 0; i < result.length; i++) {
            const newAddress = result[i].returnValues.addressOfCoinUse;
            await HandleUpdateAddressOfCoinUse(newAddress);
        }
    })

    plantVsZombieContract.getPastEvents(ImcrementBox, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log('----> ImcrementBox')
        console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            const amount = result[i].returnValues.amountBoxImcrement * 1;
            await HandleImcrementBox(amount);
        }
        console.log('done imcrement box');
    })

    plantVsZombieContract.getPastEvents(ImcrementBoxVip, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            const amount = result[i].returnValues.amountBoxVipImcrement * 1;
            await HandleImcrementBoxVip(amount);
        }
        console.log('done imcrement box vip');
    })

    plantVsZombieContract.getPastEvents(ImcrementPlantFood, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            const amount = result[i].returnValues.amountPlantFoodImcrement * 1;
            await HandImcrementPlantFood(amount);
        }
    })

    plantVsZombieContract.getPastEvents(UpdatePriceOfBox, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        
        for (let i = 0; i < result.length; i++) {

            let priceOfBoxNew = result[i].returnValues.priceOfBoxNew * 1;
            await HandleUpdatePriceOfBox(priceOfBoxNew);
        }
    })

    plantVsZombieContract.getPastEvents(UpdatePriceOfBoxVip, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        
        for (let i = 0; i < result.length; i++) {
            let priceOfBoxVipNew = result[i].returnValues.priceOfBoxVipNew * 1;
            await HandleUpdatePriceOfBoxVip(priceOfBoxVipNew);
        }
    })

    plantVsZombieContract.getPastEvents(UpdatePriceOfPlantFood, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        for (let i = 0; i < result.length; i++) {
            let priceOfPlantFoodNew = result[i].returnValues.priceOfPlantFoodNew * 1;
            await HandleUpdatePriceOfPlantFood(priceOfPlantFoodNew);
        }
    })

    plantVsZombieContract.getPastEvents(BuyBox, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log('--->BuyBox')
        console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            let data = {
                addressOfBuyer: result[i].returnValues.addressOfBuyer,
                isVip: result[i].returnValues.isVip,
                amountBoxBuy: result[i].returnValues.amountBoxBuy * 1,
            }
            await HandleBuyBox(data);
            console.log('done')
        }
    })

    plantVsZombieContract.getPastEvents(BuyPlantFood, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            let data = {
                addressOfBuyer: result[i].returnValues.addressOfBuyer,
                amountPlantFoodBuy: result[i].returnValues.amountPlantFoodBuy *1,
            }
            await HandleBuyPlantFood(data);
   
        }
    })

    plantVsZombieContract.getPastEvents(UnBox, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
       console.log('-----> unbox')
       console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            const data = {
                name : result[i].returnValues.plant.name,
                suncost : result[i].returnValues.plant.suncost * 1,
                damage : result[i].returnValues.plant.damage * 1,
                toughness : result[i].returnValues.plant.toughness * 1,
                recharge: result[i].returnValues.plant.recharge *1,
                speed: result[i].returnValues.plant.speed* 1,
                numberPlantFood: result[i].returnValues.plant.numberPlantFood *1,
                isVip: result[i].returnValues.plant.isVip,
                tokenId: result[i].returnValues.tokenId,
                owner : result[i].returnValues.OwnerOfPlant,
            }
            console.log(data);
            console.log();
            await HandleUnBox(data);
        }
    })

    plantVsZombieContract.getPastEvents(UsePlantFood, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        console.log('----> UsePlantFood');
        console.log(result);
        
        for (let i = 0; i < result.length; i++) {
            const data = {
                addressOfBuyer: result[i].returnValues.account,
                tokenId: result[i].returnValues.tokenId,
                properties: result[i].returnValues.properties,
            }
            console.log("----> data day nhe")
            console.log(data);
            await HandleUsePlantFood(data);
   
        }
    })

    lastBlock = toBlock + 1;
    saveConfig()
}

setInterval(async function () {
    await getEvent()
}, 4000)
