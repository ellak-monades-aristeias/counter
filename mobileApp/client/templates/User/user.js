Template.User.helpers({
	user: function() {
		return Meteor.user();
	}
});

Template.User.events({
	'click [data-action="logout"]': function (evt,tmpl) {
  		evt.preventDefault();
    	AccountsTemplates.logout();		
	}
});

