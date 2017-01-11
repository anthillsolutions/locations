'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationsSchema = new mongoose.Schema({
  timestamp: String,
  latitude: String,
  longitude: String,
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;
