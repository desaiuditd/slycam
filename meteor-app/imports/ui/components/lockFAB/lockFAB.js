/**
 * Created by udit on 3/14/17.
 */

import { Meteor } from 'meteor/meteor';
import { Settings } from '../../../api/settings/settings.js';
import './lockFAB.html';

Template.lockFAB.onCreated(function () {
  Meteor.subscribe('settings.all');
});

Template.lockFAB.helpers({
  isOpenClass() {
    const lockStatus = Settings.findOne({name: 'lock.status'});

    if (lockStatus && lockStatus.value === 'unlock') {
      return 'btn-success';
    }

    return 'btn-default';
  }
});

Template.lockFAB.events({
  'click #lock-manual-override'(e) {
    e.preventDefault();
    Meteor.call('slycam.door.open', function (err, res) {
      Bert.alert({
        title: 'Yay !',
        message: 'Door is opened.',
        type: 'success',
        style: 'growl-top-right',
      });
    });
  },
});