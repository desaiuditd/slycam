/**
 * Created by udit on 3/9/17.
 */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Push.Configure({
    android: {
      senderID: 582430128541,
      alert: true,
      badge: true,
      sound: true,
      vibrate: true,
      clearNotifications: true,
      icon: 'ic_stat_logo',
      iconColor: '#e91e63',
    },
    ios: {
      alert: true,
      badge: true,
      sound: true,
      vibrate: true,
    }
  });

  Push.addListener('token', function(token) {
    // Token is { apn: 'xxxx' } or { gcm: 'xxxx' }
    console.log('token');
    console.log(JSON.stringify(token));
  });

  Push.addListener('alert', function(notification) {
    // Called when message got a message in forground
    console.log('alert');
    console.log(JSON.stringify(notification));

    Bert.alert({
      title: notification.title,
      message: notification.message,
      type: 'info',
      style: 'growl-top-right',
    });

  });

  Push.addListener('badge', function(notification) {
    // Called when message got a badge
    console.log('badge');
    console.log(JSON.stringify(notification));

    Bert.alert({
      title: notification.title,
      message: notification.message,
      type: 'info',
      style: 'growl-top-right',
    });

  });

  Push.addListener('message', function(notification) {
    // Called on every message
    console.log('message');
    console.log(JSON.stringify(notification));
  });

});
