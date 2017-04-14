import './body.html';

import "../../components/appNav/appNav.js";
import '../../components/lockFAB/lockFAB.js';

Template.App_body.onRendered(() => {
  $('body').addClass('sidebar-mini skin-bart fixed');
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
  });
  $('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
  });
});

Template.App_body.events({
  'click .main-sidebar .sidebar-menu li a': () => {
    if (!$('body').hasClass('sidebar-collapse') && is.mobile()) {
      $('a[data-toggle="offcanvas"]').click();
    }
  },
});
