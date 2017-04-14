/**
 * Created by udit on 3/9/17.
 */

// Definition of the visits collection

import { Mongo } from 'meteor/mongo';

export const People = new Mongo.Collection('people');

/**
 *
 * _id
 * timestamp
 * name
 * isStranger - boolean
 * isAutoAllowed - boolean
 *
 * */
