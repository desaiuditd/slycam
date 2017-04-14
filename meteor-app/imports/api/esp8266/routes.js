/**
 * Created by udit on 3/8/17.
 */

import { Meteor } from 'meteor/meteor';
import { Kairos } from '../kairos/api.js';
import { Visits } from '../visits/visits.js';
import { People } from '../people/people.js';
import { Settings } from '../settings/settings.js';
import { SlyCamPush } from '../push/push.js';

const multer  = require('multer');
const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpeg');
  }
});
const upload = multer({ storage : storage}).single('userfile');
const fs = require('fs');

Picker.route('/api/post-photo/', function(params, req, res, next) {
  upload(req, res, Meteor.bindEnvironment(function(err) {
    if(err) {
      console.log(err);
      return res.end("Error uploading file.");
    }

    let photo = '';
    if (req.file) {
      const imageData = fs.readFileSync(req.file.path);
      const imageBase64 = 'data:' + req.file.mimetype + ';base64,' + imageData.toString('base64');
      photo = imageBase64;
    }

    const recognize = Kairos.recognize(photo);

    if (recognize.images && recognize.images[0].transaction && recognize.images[0].transaction.status === 'success') {
      const candidate = recognize.images[0].candidates[0];
      // person is known
      /**
       * candidate object
       * {
       *		"subject_id": "1489058131859",
			 *    "confidence": 0.66222,
			 *    "enrollment_timestamp": "1489059145384"
       * }
       * */

        // subject_id === personId
        // check if person is available in Mongo
      const person = People.findOne({_id: candidate.subject_id});

      console.log(person);

      if (person) {
        // person detected. present in mongo.

        // check for autoAllow.
        if (person.isAutoAllowed) {

          // insert visit
          const visitId = Visits.insert({
            photo: photo,
            timestamp: Date.now(),
            entryAllowed: false,
            personId: person._id,
            confidence: candidate.confidence,
          });

          // send push notification to notify the user.
          // show % confidence
          const pushId = SlyCamPush.sendPush('Ting!', person.name + ' is on the door and the door is opened.', {visitId: visitId});
          console.log(pushId);

          // send signal to open the lock
          Meteor.call('slycam.door.open', visitId);

          // if tagged with existing person from mongo
          // then verify it. Kairos Verify
          Kairos.verify(person._id, photo);

        } else {

          // insert visit
          const visitId = Visits.insert({
            photo: photo,
            timestamp: Date.now(),
            entryAllowed: false,
            personId: person._id,
            confidence: candidate.confidence,
          });

          // send push notification to notify the user.
          // show % confidence
          // ask whether to open the door or not.
          const pushId = SlyCamPush.sendPush('Ting!', person.name + ' is on the door. Open the door.', {visitId: visitId});
          console.log(pushId);

        }

      } else {
        // person detected but not tagged in Mongo. So ask user and save in mongo.

        // insert visit
        const visitId = Visits.insert({
          photo: photo,
          timestamp: Date.now(),
          entryAllowed: false,
        });

        // send push notification to notify the user.
        // show % confidence
        // ask to tag the user.

        // ask whether to open the door or not.
        const pushId = SlyCamPush.sendPush('Ting!', 'A familiar face with ' + (candidate.confidence*100) + '% confidence is at the door. You may open the door or identify.', {visitId: visitId});
        console.log(pushId);
      }

    } else if ((recognize.images && recognize.images[0].transaction && recognize.images[0].transaction.status === 'failure')
      || (recognize.Errors && recognize.Errors[0].Message && recognize.Errors[0].Message === 'gallery name not found')) {

      // person is unknown or stranger.
      // ask user who it is.
      // TODO: send notification

      console.log('failure');

      const visitId = Visits.insert({
        photo: photo,
        timestamp: Date.now(),
        entryAllowed: false,
      });

      // send push notification to notify the user.

      // if tagged with existing person from mongo
      // then verify it. Kairos Verify

      // else

      // enroll the picture in Kairos first. for future use.

      // ask whether to open the door or not.

      const pushId = SlyCamPush.sendPush('Ting!', 'You\'ve an unknown visitor. You may open the door or identify.', {visitId: visitId});
      console.log(pushId);

    } else {
      // {"Errors":[{"Message":"no faces found in the image","ErrCode":5002}]}
      // do nothing.
    }

    console.log(JSON.stringify(recognize));

    return res.end(JSON.stringify(recognize));
  }));
});

Picker.route('/api/check-lock-status/', function (params, req, res, next) {
  const lockStatus = Settings.findOne({name:'lock.status'});
  const response = {
    // status : 'unlock',
    status: lockStatus.value,
  };
  res.end(JSON.stringify(response));
});
