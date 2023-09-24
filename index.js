// const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) return null;
//   return ip;
// });

fetchCoordsByIP('6.234.62.74', (error, data) => {
  console.log(error, data);
});