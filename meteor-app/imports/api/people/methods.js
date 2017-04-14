/**
 * Created by udit on 3/9/17.
 */

import { Meteor } from 'meteor/meteor';
import { Visits } from '../visits/visits.js';
import { People } from './people.js';
import { Kairos } from '../kairos/api.js';

Meteor.methods({
  'people.insert'(name) {
    return People.insert({
      name: name,
      isStranger: false,
      timestamp: Date.now(),
    });
  },
  'people.search'(query, options) {
    const optionz = options || {};

    // guard against client-side DOS: hard limit to 50
    if (optionz.limit) {
      optionz.limit = Math.min(10, Math.abs(optionz.limit));
    } else {
      optionz.limit = 10;
    }

    var regex = new RegExp("^" + query, 'i');

    const searchedPeople = People.find({name: {$regex:  regex}}, optionz).fetch();

    let response = [];

    if (searchedPeople.length === 0) {
      response.push(
        {
          name: 'Add New Person',
          query,
          personNotFound: true,
        }
      );
    } else {
      response = searchedPeople;
    }

    return response;
  },
  'person.remove'(_id) {
    console.log(Kairos.removeSubject(_id));
    Visits.upsert({personId:_id}, {$unset: {personId:'', confidence: ''}});
    return People.remove(_id);
  },
  'person.autoallow'(_id, isAutoAllowed) {
    return People.upsert({_id: _id}, {$set: {isAutoAllowed: isAutoAllowed}});
  },
});
