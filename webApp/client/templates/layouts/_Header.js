Template._Header.events({
   'click [data-action="logout"]' : function(evt,tmpl) {
  	evt.preventDefault();
    AccountsTemplates.logout();
    console.log('bitch!')
  }
});

Template._Header.helpers({
	title: function () {
		var t = Meteor.settings.public.TITLE;
		return t || 'Counter Admin Interface';
	}
});