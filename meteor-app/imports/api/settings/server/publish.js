/**
 * Created by udit on 3/9/17.
 */

import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings.js';

Meteor.publish('settings.all', function () {
  return Settings.find();
});
