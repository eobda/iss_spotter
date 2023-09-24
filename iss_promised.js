const request = require('request-promise-native');

const fetchMyIP = function() {
  // Fetch the IP address from the API using request
  // Return the promise that is returned by request
  return request('https://api.ipify.org/?format=json');
};

module.exports = { fetchMyIP };