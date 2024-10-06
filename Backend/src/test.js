const Contract = require('./models/contract')
require('./db/mongoose');
const HandlePauable = require('./handleEvent/handlePaused');
const HandleUpdateAddressOfCoinUse = require('./handleEvent/handleUpdateAddressOfCoinUse');
const HandleBuyBox = require('./handleEvent/handleBuyBox');
HandleUpdateAddressOfCoinUse('haha');
HandleBuyBox()
