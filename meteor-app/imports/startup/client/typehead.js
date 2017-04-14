/**
 * Created by udit on 3/13/17.
 */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.typeahead.inject();
});