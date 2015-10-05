Template.AuthLayout.helpers({
	title: function () {
		var t = Meteor.settings.public.TITLE;
		return t || 'Counter Admin Interface';
	}
});