'use strict';

require('dotenv').config({ silent: true });
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Location = require('./models/Location.js');

var packageVersion = require('./package.json');
console.log('version: ' + packageVersion.version);

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console,
  'MongoDB Connection Error. ' +
  'Please make sure that MongoDB is running.\n'));

db.once('open', () => {
  console.log('Connection opened.');

  switch (process.env.ACTION) {
    case 'flush': {
      flush();
      break;
    }
    case 'find': {
      findLocation();
      break;
    }
    case 'delete': {
      findLocation();
      flush();
      break;
    }
    default: {
      saveLocation();
    }
  }
});

function flush() {
  Location.remove({}).exec()
    .then(() => {
      console.log('Database has been flushed.');
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

function saveLocation() {
  if (process.env.BULK_SAVE > 0) {
    saveMultiple(process.env.BULK_SAVE);
  } else {
    saveSimple();
  }
}

function saveSimple() {
  var location = new Location({
    timestamp: new Date().getTime(),
    latitude: '12.12',
    longitude: '5.14',
  });
  location.save()
    .then(location => {
      console.log(location);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

function saveMultiple(count) {

  var locations = [];

  // Creating locations with random coordinates and adding them to an array
  for (var i = 0; i < count; i++) {
    var location = new Location({
      timestamp: new Date().getTime(),
      latitude: Math.round((Math.random() * 90) * 100) / 100 ,
      longitude: Math.round((Math.random() * 180) * 100) / 100,
    });
    locations[i] = location;
  }

  // Bulk inserting the array of locations into the DB
  Location.insertMany(locations)
    .then(locations => {
      console.log(locations);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

function findLocation() {

  var latitudeRange, longitudeRange, timestampRange;

  var query = Location.find({});

  // Latitude Range
  if(process.env.LATITUDE_RANGE){
    latitudeRange = process.env.LATITUDE_RANGE.split('-');
    if(latitudeRange.length == 1){
      query.where('latitude').equals(latitudeRange[0]);
    }else{
      if(latitudeRange[0]){
        query.where('latitude').gte(latitudeRange[0]);
      }
      if(latitudeRange[1]){
        query.where('latitude').lte(latitudeRange[1]);
      }
    }
  }

  // Longitude Range
  if(process.env.LONGITUDE_RANGE){
    longitudeRange = process.env.LONGITUDE_RANGE.split('-');
    if(longitudeRange.length == 1){
      query.where('longitude').equals(longitudeRange[0]);
    }else{
      if(longitudeRange[0]){
        query.where('longitude').gte(longitudeRange[0]);
      }
      if(longitudeRange[1]){
        query.where('longitude').lte(longitudeRange[1]);
      }
    }
  }

  // Timestamp range
  if(process.env.TIMESTAMP_RANGE){
    timestampRange = process.env.TIMESTAMP_RANGE.split('-');
    if(timestampRange.length == 1){
      query.where('timestamp').equals(timestampRange[0]);
    }else{
      if(timestampRange[0]){
        query.where('timestamp').gte(timestampRange[0]);
      }
      if(timestampRange[1]){
        query.where('timestamp').lte(timestampRange[1]);
      }
    }
  }

  query.then(locations => {
      console.log(locations);
      console.log('Results :' + locations.length);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
