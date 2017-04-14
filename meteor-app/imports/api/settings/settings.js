/**
 * Created by udit on 3/11/17.
 */

import { Mongo } from 'meteor/mongo';

export const Settings = new Mongo.Collection('settings');

/**
 *
 * name
 * value
 *
 * lock.status: 'lock'
 * lock.status: 'unlock'
 * lock.timeout: 15 // seconds
 *
 * visit.timeout: 5 // minutes
 *
 */