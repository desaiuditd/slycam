// Client entry point, imports all client code

import '../imports/ui/js/arrive.js';
import '../imports/ui/js/material.js';
import '../imports/ui/js/ripples.js';

import '../imports/startup/client';
import '../imports/startup/both';

Meteor.startup(() => {
  $.material.init();
});