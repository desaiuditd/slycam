/**
 * Created by udit on 3/15/17.
 */

import { Meteor } from 'meteor/meteor';
import { Settings } from './settings.js';

Meteor.methods({
  'settings.save'(visitTimeout, lockTimeout) {
    Settings.upsert({name: 'visit.timeout'}, {$set: {value: visitTimeout}});
    Settings.upsert({name: 'lock.timeout'}, {$set: {value: lockTimeout}});
  },
});
