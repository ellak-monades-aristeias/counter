Meteor.startup(function() {
	AutoForm.setDefaultTemplate("semanticUI");
	T9n.setLanguage('el');

	subsCache = new SubsCache({expireAfter: -1});
	if (Meteor.isCordova) Meteor.subscribe("paths");
});