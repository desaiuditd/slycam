/**
 * Created by udit on 3/9/17.
 */

import { HTTP } from 'meteor/http';

export const Kairos = {
  enroll: function (personId, imageBase64) {
    return HTTP.post('https://api.kairos.com/enroll', {
        headers: {
          app_key: 'f0053fb561d9ab7f747fba875c2a218d',
          app_id: 'b850093c',
          'Content-Type': 'application/json',
        },
        data: {
          image: imageBase64,
          subject_id: personId,
          gallery_name: 'slycam',
        },
      }
    ).content;
  },
  verify: function (personId, imageBase64) {
    return HTTP.post('https://api.kairos.com/verify', {
        headers: {
          app_key: 'f0053fb561d9ab7f747fba875c2a218d',
          app_id: 'b850093c',
          'Content-Type': 'application/json',
        },
        data: {
          image: imageBase64,
          subject_id: personId,
          gallery_name: 'slycam',
        },
      }
    ).content;
  },
  recognize: function (imageBase64) {
    return JSON.parse(HTTP.post('https://api.kairos.com/recognize', {
        headers: {
          app_key: 'f0053fb561d9ab7f747fba875c2a218d',
          app_id: 'b850093c',
          'Content-Type': 'application/json',
        },
        data: {
          image: imageBase64,
          gallery_name: 'slycam',
        },
      }
    ).content);
  },
  removeSubject: function (personId) {
    return JSON.parse(HTTP.post('https://api.kairos.com/gallery/remove_subject', {
        headers: {
          app_key: 'f0053fb561d9ab7f747fba875c2a218d',
          app_id: 'b850093c',
          'Content-Type': 'application/json',
        },
        data: {
          gallery_name: 'slycam',
          subject_id: personId,
        },
      }
    ).content);
  },
};