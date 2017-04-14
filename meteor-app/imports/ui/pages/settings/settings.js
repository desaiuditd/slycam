/**
 * Created by udit on 3/10/17.
 */

import { Meteor } from 'meteor/meteor';
import { Settings } from '../../../../imports/api/settings/settings.js';

import './settings.html';

Template.App_settings.helpers({
  lockTimeout() {
    const lockTimeout = Settings.findOne({name:'lock.timeout'});
    return (lockTimeout && lockTimeout.value) ? lockTimeout.value : 15;
  },
  visitTimeout() {
    const visitTimeout = Settings.findOne({name:'visit.timeout'});
    return (visitTimeout && visitTimeout.value) ? visitTimeout.value : 5;
  },
});

Template.App_settings.events({
  'click #save-settings'(e) {
    e.preventDefault();
    const lockTimeout = $('#lock-timeout').val();
    const visitTimeout = $('#visit-timeout').val();

    Meteor.call('settings.save', visitTimeout, lockTimeout, function (err, res) {
      if(err) {
        Bert.alert({
          title: 'Oops !',
          message: 'Something went wrong.',
          type: 'danger',
          style: 'growl-top-right',
        });
        return;
      }

      Bert.alert({
        title: 'Yay !',
        message: 'Settings are saved.',
        type: 'success',
        style: 'growl-top-right',
      });

    });

    return false;
  }
});
