/**
 * Created by udit on 3/9/17.
 */

import { Meteor } from 'meteor/meteor';
import { Visits } from './visits.js';

Meteor.methods({
  'visits.insert'() {
    return Visits.insert({
      createdAt: new Date(),
    });
  },
  'visit.remove'(_id) {
    return Visits.remove(_id);
  },
  'visit.identify.person'(_id, personId) {
    return Visits.upsert({_id: _id}, {$set: {personId: personId}})
  }
});
