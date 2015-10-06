Template._Header.events({
   'click [data-action="logout"]' : function(evt,tmpl) {
  	evt.preventDefault();
    AccountsTemplates.logout();
  }
});

Template._Header.helpers({
	title: function () {
		return (Meteor.settings && Meteor.settings.public) ? Meteor.settings.public.TITLE : 'Counter Admin Interface';
	}
});