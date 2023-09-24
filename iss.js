const request = require('request');

/**
Makes a single API request to retrieve the user's IP address.

Input:
*   A callback (to pass back an error or the IP string)

Returns (via callback):
*   An error, if any (nullable)
*   The IP address as a string (null if error). Example: "162.245.144.188"
*/
const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    return;
  });
};

/*
Makes a single API request to retrieve the lat/lng for a given IPv4 address.

Input:
*   The ip (ipv4) address (string)
*   A callback (to pass back an error or the lat/lng object)

Returns (via callback):
*   An error, if any (nullable)
*   The lat and lng as an object (null if error). Example: { latitude: '49.27670', longitude: '-123.13000' }
*/
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching data. Response: ${body}`), null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was false. Server message says: ${parsedBody.message}`;
      callback(message, null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
    return;
  });
};

/*
Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.

Input:
*   An object with keys `latitude` and `longitude`
*   A callback (to pass back an error or the array of resulting data)

Returns (via callback):
*   An error, if any (nullable)
*   The fly over times as an array of objects (null if error). Example: [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching data. Response: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
    return;
  });
};

/*
Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.

Input:
*   - A callback with an error or results.

Returns (via callback):
*   An error, if any (nullable)
*   The fly-over times as an array (null if error): [ { risetime: <number>, duration: <number> }, ... ]
*/

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) {
          callback(error, null);
          return;
        }

        console.log('It worked! Returned data:', data);
      });

    });
  });
  
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };