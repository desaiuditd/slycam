/**
 * Created by udit on 3/10/17.
 */

import { Visits } from '../../../../imports/api/visits/visits.js';
import { People } from '../../../../imports/api/people/people.js';
import { Meteor } from 'meteor/meteor';

import './people.html';

Template.App_people.onCreated(function () {
  Meteor.subscribe('visits.all');
  Meteor.subscribe('people.all');
});

Template.App_people.helpers({
  people() {
    return People.find({}, {sort: {timestamp: -1}}).fetch();
  },
  getPersonPhoto() {
    const personId = this._id;
    const personVisits = Visits.find({personId: personId}, {sort: {timestamp: -1}}).fetch();

    if (personVisits.length > 0) {
      const lastVisit = personVisits[0];
      return lastVisit.photo;
    }
  },
  isAutoAllowChecked() {
    return (this.isAutoAllowed) ? 'checked' : '';
  }
});

Template.App_people.events({
  'click .remove-person'(e) {
    Meteor.call('person.remove', this._id);
  },
  'change .auto-allow-person'(e) {
    Meteor.call('person.autoallow', this._id, $(e.target).is(':checked'));
  }
});