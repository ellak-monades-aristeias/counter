Template._Header.events({
   'click [data-action="logout"]' : function(evt,tmpl) {
  	evt.preventDefault();
    AccountsTemplates.logout();
  }
});

Template._Header.helpers({
	connected: function () {
		return Meteor.status().connected;
	}
});