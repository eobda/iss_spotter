const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

const myIP = fetchMyIP((error, ip) => {
  if (error) return null;
  return ip;
});

fetchCoordsByIP(myIP, (error, data) => {
  console.log(error, data);
});