/**
 * Created by udit on 3/9/17.
 */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // add initial setup data here
  Push.Configure({
    // apn: {
    //   certData: Assets.getText('apnDevCert.pem'),
    //   keyData: Assets.getText('apnDevKey.pem'),
    //   passphrase: 'xxxxxxxxx',
    //   production: true,
    //   //gateway: 'gateway.push.apple.com',
    // },
    gcm: {
      apiKey: 'AAAAh5uKeZ0:APA91bEbL-AqfRQBvBNtOkM2ZoGLt-lt5iLwfkN8UyvuJbQ_nf9JyPN14ot1gG0TRBJhOfq_dBxC6Zp14E_B4ejLTHrKngvnlPDTBkO1vGG4R2oR4xXgajzHbIDrSX9DLDzTSeC-OXuP',
      projectNumber: 582430128541
    },
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    // 'keepNotifications': false,
  });
});
