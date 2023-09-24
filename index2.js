const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body));