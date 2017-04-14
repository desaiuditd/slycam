/**
 * Created by udit on 3/12/17.
 */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Bert.defaults = {
    hideDelay: 6000,
    // Accepts: a number in milliseconds.
  };
});