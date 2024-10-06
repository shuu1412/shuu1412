const User = require('../models/user');
const Plant = require('../models/plant');
require('../db/mongoose');

const HandleUnBox = async function(data) {
    let user = await User.findOne({ address: data.owner});
    let plant = await Plant.findOne({ tokenId: data.tokenId});
    if(!user) {
        user = new User({
            address: data.owner,
        });
    }
    if(!plant) {
        plant = new Plant({
            name: data.name,
            suncost: Number(data.suncost),
            damage: Number(data.damage),
            toughness: Number(data.toughness),
            recharge: Number(data.recharge),
            speed: Number(data.speed),
            numberPlantFood: Number(data.numberPlantFood),
            isVip:data.isVip,
            tokenId: data.tokenId,
            owner: data.owner,
        });
        user.plants.push(data.tokenId);
    }
    else {
        plant.name = data.name;
        plant.suncost += Number(data.suncost);
        plant.damage += Number(data.damage);
        plant.toughness += Number(data.toughness);
        plant.recharge += Number(data.recharge);
        plant.speed += Number(data.speed);
        plant.numberPlantFood += Number(data.numberPlantFood);
        plant.tokenId = data.tokenId;
        plant.owner = data.owner;
    }
    if(data.isVip) {
        user.amountBoxVip -=1;
    }
    else {
        user.amountBox -=1;
    }
    await user.save();
    await plant.save();
}
module.exports = HandleUnBox;