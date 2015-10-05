Meteor.startup(function() {

	AutoForm.setDefaultTemplate("semanticUI");

	subsCache = new SubsCache({expireAfter: -1});

	if (Meteor.isCordova) Meteor.subscribe("paths");
	
});