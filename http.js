const axios = require('axios');

const axiosOptions = {
    headers: {
        'Content-Type': 'application/json'
    }
};

module.exports = axios.create(axiosOptions);