/**
 * Created by udit on 3/9/17.
 */

import { Meteor } from 'meteor/meteor';

const fs = require('fs');

Meteor.startup(() => {
  // add initial setup data here
  fs.stat('./uploads/', function (err, stats) {
    if(err && err.code === 'ENOENT') {
      fs.mkdirSync('./uploads/');
    }
  });
});
