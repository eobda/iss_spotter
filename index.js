const { nextISSTimesForMyLocation } = require('./iss');

/*
Input:
*   Array of data objects defining the next fly-overs of the ISS. [ { risetime: <number>, duration: <number> }, ... ]

Returns:
*   undefined

Side effect:
*   Console log messages to make that data more human readable.
*    Example output: Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
*/
const printPassTimes = function(passTimes) {
  passTimes.forEach((passTime) => {
    // convert epoch time date to human readable date
    const date = new Date(passTime.risetime * 1000);
    const duration = passTime.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  printPassTimes(passTimes);
});

module.exports = { printPassTimes };