Template.AuthLayout.helpers({
	title: function () {
		var t = Meteor.settings.public.TITLE || 'Counter Admin Interface';
		return t;
	}
});