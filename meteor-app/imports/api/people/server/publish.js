/**
 * Created by udit on 3/9/17.
 */

// All visits-related publications

import { Meteor } from 'meteor/meteor';
import { People } from '../people.js';

Meteor.publish('people.all', function () {
  return People.find();
});
