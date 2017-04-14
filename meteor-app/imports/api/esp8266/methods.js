/**
 * Created by udit on 3/11/17.
 */

import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings/settings.js';
import { Visits } from '../visits/visits.js';
import { Kairos } from '../kairos/api.js';

Meteor.methods({
  'slycam.door.open'(visitId) {
    // change lock status
    Settings.upsert({name: 'lock.status'}, {$set: {value: 'unlock'}});

    // we will call the same method for manual override. So that time no visitId is needed.
    if (visitId) {
      Visits.update({_id: visitId}, {$set: {entryAllowed: true}});
    }

    let lockTimeout = Settings.findOne({name:'lock.timeout'});

    console.log(lockTimeout);

    if(!lockTimeout) {
      lockTimeout = { value : 15 };
    }

    if (!lockTimeout.value) {
      lockTimeout.value = 15;
    }

    Meteor.setTimeout(() => {
      console.log("lock again");
      Settings.upsert({name: 'lock.status'}, {$set: {value: 'lock'}});
    }, lockTimeout.value*1000);
  },
  'kairos.enroll'(visitId, personId) {
    const visitObj = Visits.findOne({_id: visitId});

    if (!visitObj) {
      return 'No visit found. Enroll Failed.';
    }

    return Kairos.enroll(personId, visitObj.photo);
  },
  'kairos.verify'(visitId, personId) {
    const visitObj = Visits.findOne({_id: visitId});

    if (!visitObj) {
      return 'No visit found. Verify Failed.';
    }

    return Kairos.verify(personId, visitObj.photo);
  },
});
