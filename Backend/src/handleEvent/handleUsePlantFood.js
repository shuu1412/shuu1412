const Plant = require('../models/plant');
const User = require('../models/user');
require('../db/mongoose');

const HandleUsePlantFood = async function(data) {
    let plant = await Plant.findOne({ tokenId: data.tokenId});
    let user = await User.findOne({ address: `${data.addressOfBuyer}`});
    console.log("++++++++++++++++++++> user ne" + user);

    if(!plant) {
        console.log("HandleUsePlantFood: ------------------> tao them plant ne");
        plant = new Plant({
            tokenId: data.tokenId,
        })
    }
    if(!user) {
        console.log("HandleUsePlantFood: ------------------> tao them user ne");
        user = new User({
            address: data.addressOfBuyer,
        })
    }
    if(data.properties == 1 ) {
        plant.suncost -=10;
    }
    else if(data.properties == 2) {
        plant.damage +=20;
    }
    else if(data.properties ==3) {
        plant.toughness +=100;
    }
    else if(data.properties == 4) {
        plant.recharge -= 2;
    }
    else {
        plant.speed += 1;
    }
    console.log("------------> Haha");
    console.log("++++++++++++++++++++> user ne" + user);
    console.log("-----------> truoc khi" + user.amountPlantFood);
    user.amountPlantFood  -= 1;
    console.log("-----------> sau khi dung" + user.amountPlantFood)
    plant.numberPlantFood -= 1;
    await plant.save();
    await user.save();

}
module.exports = HandleUsePlantFood;