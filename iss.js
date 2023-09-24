const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    const output = {};
    output.latitude = data.latitude;
    output.longitude = data.longitude;
    callback(null, output);
    return;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };