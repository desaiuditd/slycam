/**
 * Created by udit on 3/10/17.
 */

import { Visits } from '../../../../imports/api/visits/visits.js';
import { People } from '../../../../imports/api/people/people.js';
import { Settings } from '../../../../imports/api/settings/settings.js';
import { Meteor } from 'meteor/meteor';
import './visits.html';

Template.App_visits.onCreated(function () {
  Meteor.subscribe('visits.all');
  Meteor.subscribe('people.all', function () {
    Meteor.typeahead.inject();
  });
});

Template.App_visits.helpers({
  visits() {
    return Visits.find({}, {sort: {timestamp: -1}}).fetch();
  },
  getName(personId) {
    const person = People.findOne({_id: personId});
    if(person) return person.name;
    return 'Stranger';
  },
  getConfidence() {
    if(this.confidence) {
      let confidence = this.confidence*100;
      confidence = confidence.toFixed(0);

      return '(' + confidence + '%)';
    }
    return '';
  },
  getTime(timestamp) {
    return '<span data-toggle="tooltip" title="' + moment(timestamp).format('Do MMM, YYYY') + '">' + moment(timestamp).fromNow() + '</span>';
  },
  isValidVisit() {
    const now = moment();
    const timestamp = moment(this.timestamp);
    const diff = now.diff(timestamp, 'minutes');
    let visitTimeout = Settings.findOne({name:'visit.timeout'});

    if(!visitTimeout) {
      visitTimeout = { value : 5 };
    }

    if (!visitTimeout.value) {
      visitTimeout.value = 5;
    }

    if(diff >= visitTimeout.value) {
      return false;
    }
    return true;
  },
  showOpenDoorBtn() {
    const now = moment();
    const timestamp = moment(this.timestamp);
    const diff = now.diff(timestamp, 'minutes');
    let visitTimeout = Settings.findOne({name:'visit.timeout'});

    if(!visitTimeout) {
      visitTimeout = { value : 5 };
    }

    if (!visitTimeout.value) {
      visitTimeout.value = 5;
    }

    return !this.entryAllowed && diff < visitTimeout.value;
  },
  searchPeople(query, sync, callback) {

    const options = {
      limit: 10,
    };

    Meteor.call(
      'people.search', query, options, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        callback(res.map((v) => {
          v.value = v.name;
          return v;
        }));
      }
    );
  },
  personSelected(event, dataObject) {
    const visitId = $(event.target).data('visit-id');

    const $flipBtn = $(event.target).closest('figure.back').find('.flip-card');

    if (dataObject.personNotFound) {
      // add new person.
      Meteor.call('people.insert', dataObject.query, function (err, personId) {

        if(err) {
          console.log(err);
          return;
        }

        console.log(personId);

        Meteor.call('kairos.enroll', visitId, personId, function (err1, res1) {
          if(err1) {
            console.log(err1);
            return;
          }

          console.log(res1);

          Meteor.call('visit.identify.person', visitId, personId, function (err2, res2) {
            if(err2) {
              console.log(err2);
              return;
            }

            console.log(res2);

            $flipBtn.click();
          });
        });
      });
    } else {
      Meteor.call('kairos.verify', visitId, dataObject._id, function (err, res) {
        if(err) {
          console.log(err);
          return;
        }

        console.log(res);

        Meteor.call('visit.identify.person', visitId, dataObject._id, function (err1, res1) {
          if(err1) {
            console.log(err1);
            return;
          }

          console.log(res1);

          $flipBtn.click();
        });
      });
    }
  },
});

Template.App_visits.events({
  'click .fa-info-circle': function (e) {
    const target = e.target;
    $(target).closest('.w3-card-24').toggleClass('flipped');
  },
  'click .flip-card': function (e) {
    const target = e.target;
    $(target).closest('.w3-card-24').toggleClass('flipped');
  },
  'click .remove-visit': function (e) {
    e.preventDefault();
    Meteor.call('visit.remove', this._id);
  },
  'click .open-door': function (e) {
    Meteor.call('slycam.door.open', this._id);
  },
});
