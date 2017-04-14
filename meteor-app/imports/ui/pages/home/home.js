
import { Visits } from '../../../../imports/api/visits/visits.js';
import { People } from '../../../../imports/api/people/people.js';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'

import './home.html';

const Chart = require('chart.js');

Template.App_home.onCreated(function () {
  Meteor.subscribe('visits.all');
  Meteor.subscribe('people.all');
});

Template.App_home.onRendered(() => {

  Tracker.autorun(() => {

    const visits = Visits.find({}).fetch();
    const people = People.find({}).fetch();

    const now = moment();
    const temp = moment().startOf('month');

    let monthlyVisits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (visits.length > 0) {
      for(let i = 0; i < visits.length; i++) {
        const year = moment(visits[i].timestamp).format('YYYY');
        const month = parseInt(moment(visits[i].timestamp).format('M'));

        if (year === now.format('YYYY')) {
          monthlyVisits[month-1]++;
        }
      }
    }

    var ctx1 = document.getElementById("visit-bar-monthly");
    var myChart1 = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Number of Visits per month",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,205,210,0.4)",
            borderColor: "rgba(255,205,210,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(233,30,99,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(233,30,99,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: monthlyVisits,
            spanGaps: false,
          }
        ]
      }
    });

    let dailyVisits = [];
    let dailyLabels = [];
    for(let i = 0; i < temp.daysInMonth(); i++) {
      dailyVisits[i] = 0;
      dailyLabels[i] = temp.format('Do MMM');
      temp.add(1, 'days');
    }

    if (visits.length > 0) {
      for(let i = 0; i < visits.length; i++) {
        const year = moment(visits[i].timestamp).format('YYYY');
        const month = moment(visits[i].timestamp).format('M');
        const date = parseInt(moment(visits[i].timestamp).format('D'));

        if (year === now.format('YYYY') && month === now.format('M')) {
          dailyVisits[date-1]++;
        }
      }
    }

    var ctx2 = document.getElementById("visit-bar-daily");
    var myChart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: dailyLabels,
        datasets: [
          {
            label: "Number of Visits per month",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,205,210,0.4)",
            borderColor: "rgba(255,205,210,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(233,30,99,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(233,30,99,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dailyVisits,
            spanGaps: false,
          }
        ]
      }
    });

    let peopleLabels = [];
    let peopleBackgroundColors = [];
    let peopleHoverBackgroundColors = [];
    let peopleVisits = [];
    let peopleIdMap = {};

    if (people.length > 1) {
      for(let i = 0; i < people.length; i++) {
        peopleIdMap[people[i]._id] = i;
        peopleLabels[i] = people[i].name;
        peopleVisits[i] = 0;
        const color = Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255)
        peopleBackgroundColors[i] = 'rgba(' + color + ', 0.4)';
        peopleHoverBackgroundColors[i] = 'rgba(' + color + ', 1)';
      }
    }

    if (visits.length > 0) {
      for(let i = 0; i < visits.length; i++) {
        if (typeof visits[i].personId != 'undefined' && typeof peopleIdMap[visits[i].personId] != 'undefined') {
          peopleVisits[peopleIdMap[visits[i].personId]] = peopleVisits[peopleIdMap[visits[i].personId]] + 1;
        }
      }
    }

    var ctx3 = document.getElementById("people-pie");
    var myChart3 = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: peopleLabels,
        datasets: [
          {
            data: peopleVisits,
            backgroundColor: peopleBackgroundColors,
            hoverBackgroundColor: peopleHoverBackgroundColors
          }
        ]
      }
    });

  });

});