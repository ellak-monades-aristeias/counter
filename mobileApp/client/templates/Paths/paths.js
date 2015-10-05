Template.Paths.onCreated(function () {
	var instance = this;
	// if online get latest data, else don't bother.
	instance.autorun(function() {
		if ( Meteor.status().connected ) {
			var PathSub = subsCache.subscribe('paths');
    	};
  	});
});

Template.Paths.helpers({
	items: function () {
		return Paths.find();
	}
});