import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/visits/visits.js';
import '../../ui/pages/people/people.js';
import '../../ui/pages/settings/settings.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/visits', {
  name: 'App.visits',
  action() {
    BlazeLayout.render('App_body', { main: 'App_visits' });
  },
});

FlowRouter.route('/people', {
  name: 'App.people',
  action() {
    BlazeLayout.render('App_body', { main: 'App_people' });
  },
});

FlowRouter.route('/settings', {
  name: 'App.settings',
  action() {
    BlazeLayout.render('App_body', { main: 'App_settings' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
