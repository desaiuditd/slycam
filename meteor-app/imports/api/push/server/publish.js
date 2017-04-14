/**
 * Created by udit on 3/9/17.
 */

Push.allow({
  send: function(userId, notification) {
    return true; // Allow all users to send
  }
});
