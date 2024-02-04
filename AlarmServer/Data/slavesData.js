
const alarmSystem = JSON.stringify({"slaveName":"alarm","ip":"192.168.3"});
const temperatureSystem = JSON.stringify({"slaveName":"temperature","ip":"192.168.4"});
const mobileApp=JSON.stringify({"slaveName":"mobileApp","ip":"192.168.5"})

// Exporting both values using a single object
module.exports = {
    alarmSystem,
    temperatureSystem,
    mobileApp
  };