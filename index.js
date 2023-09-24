const { nextISSTimesForMyLocation } = require ('./iss');

const printPassTimes = function(passTimes) {
  passTimes.forEach((passTime) => {
    // convert epoch time date to human readable date
    const date = new Date(passTime.risetime *1000);
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