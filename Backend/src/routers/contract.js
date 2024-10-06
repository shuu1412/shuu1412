const express = require('express')
const User = require('../models/user')
const { find } = require('../models/user')
const Contract = require('../models/contract')
const router = new express.Router()
const contractAddress = "0xE51a538b7DE2d9A883C01476d285700c4dD12374";



router.get('/contracts', async (req, res) => {
    try {
        const contract = await Contract.findOne({ address: `${contractAddress}`});
        res.status(200).send(contract);
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})

module.exports = router;