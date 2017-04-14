/**
 * Created by udit on 3/9/17.
 */

// Definition of the visits collection

import { Mongo } from 'meteor/mongo';

export const Visits = new Mongo.Collection('visits');

/**
 *
 * _id
 * photo: file object from multer
 * timestamp
 * personId - update this after FACE API
 * entryAllowed - boolean
 *
 * */