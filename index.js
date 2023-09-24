const { nextISSTimesForMyLocation, printPassTimes } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  printPassTimes(passTimes);
});