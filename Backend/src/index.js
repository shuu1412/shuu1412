const express = require('express');
require('./db/mongoose');
const user = require('./routers/user');
const plant = require('./routers/plant');
const contract = require('./routers/contract')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(contract);
app.use(user);

// app.use(plant);


app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
