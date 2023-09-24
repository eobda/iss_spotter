const { nextISSTimesForMyLocation } = require ('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  passTimes.forEach((passTime) => {
    // convert epoch time date to human readable date
    const date = new Date(passTime.risetime *1000);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  })
});