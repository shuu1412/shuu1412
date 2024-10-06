const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new mongoose.Schema({

    address: {
        type: String,
        require: true,
        default: '0x0000000000000000000000000000000000000000'
    },

    amountPlantFood: {
        type: Number,
        require: true,
        default: 0,
    },

    amountBox: {
        type: Number,
        require: true,  
        default: 0,
    },

    amountBoxVip: {
        type: Number,
        require: true,
        default: 0,
    }, 
    plants: [
        {
            type: String,
            default: [],
        }
    ],
}) 

const User = mongoose.model('User', userSchema);
module.exports = User;