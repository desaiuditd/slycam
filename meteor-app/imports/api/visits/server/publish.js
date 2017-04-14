/**
 * Created by udit on 3/9/17.
 */

// All visits-related publications

import { Meteor } from 'meteor/meteor';
import { Visits } from '../visits.js';

Meteor.publish('visits.all', function () {
  return Visits.find();
});
