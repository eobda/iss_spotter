const request = require('request-promise-native');

const fetchMyIP = function() {
  // Fetch the IP address from the API using request
  // Return the promise that is returned by request
  request('https://api.ipify.org/?format=json', (error, response, body))
    .then(callback(null, JSON.parse(body).ip));
};

module.exports = { fetchMyIP };