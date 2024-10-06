const fetch = require('node-fetch');
const contract = async () => {
    const response = await fetch('http://localhost:3000/contracts');
    const data = await response.json();
    console.log(data);
    return data;
}

module.exports = contract;