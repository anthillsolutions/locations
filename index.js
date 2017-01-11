'use strict';

require('dotenv').config({ silent: true });
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Location = require('./models/Location.js');

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
    default: {
      saveSimple();
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
