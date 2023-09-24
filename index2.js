const fetchMyIP = require('./iss_promised');

fetchMyIP()
  .then(console.log(ip));