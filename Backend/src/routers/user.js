const express = require('express')
const Plant = require('../models/plant')
const User = require('../models/user')
const { find } = require('../models/user')
const router = new express.Router()
const contractAddress = "0xE51a538b7DE2d9A883C01476d285700c4dD12374";



router.get('/users/:address', async (req, res) => {
    try {
        const {address} =req.params;
        const user = await User.findOne({address: address });
        res.status(200).send(user);
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})


router.get('/users/:address/plants', async (req, res) => {
    try {
        const {address} =req.params;
        const user = await User.findOne({address: address });
        let plants= [];
        
        for(let i = 0; i< user.plants.length; i++ ) {
            const plant = await Plant.findOne({tokenId :`${user.plants[i]}`});
            plants.push(plant);
        }

        res.status(200).send(plants);
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})

module.exports = router;