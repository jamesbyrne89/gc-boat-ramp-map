const boatRampsData = require("../data/boat_ramps.json");

exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify(boatRampsData),
});
