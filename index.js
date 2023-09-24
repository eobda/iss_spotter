const { nextISSTimesForMyLocation } = require ('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  passTimes.forEach((passTime) => {
    console.log(passTime);
  })
});