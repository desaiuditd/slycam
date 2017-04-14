/**
 * Created by udit on 3/12/17.
 */

export const SlyCamPush = {
  sendPush: function (title, text, query) {
    return Push.send({
      from: JSON.stringify(query),
      title: 'SlyCam - ' + title,
      text: text,
      badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
      query: {}, // Query the appCollection,
      gcm: {
        style: 'picture',
        picture: 'http://slycam.incognitech.in/img/logo.png',
      }
    });
  },
};
