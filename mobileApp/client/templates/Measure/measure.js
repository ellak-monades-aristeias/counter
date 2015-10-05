Template.Measure.onCreated(function () {
	var instance = this;
	instance.failure = new ReactiveVar(false);
	
	// if online get latest data, else don't bother.
	instance.autorun(function() {
		if ( Meteor.status().connected ) {
			var id = Router.current().params._id;
			var thisClock = Meteor.subscribe('clock.one',id);
    	};
  	});	
});

Template.Measure.helpers({
	item: function () {
		var id = Router.current().params._id;
		var clock = Clocks.findOne({_id: id});
		console.log(JSON.stringify(clock));
		return clock;
	},
	failure: function () {
		return Template.instance().failure.get();
	}	
});

Template.Measure.events({
	'click [data-action="fail"]': function(evt, tmpl) {
		evt.preventDefault();
		tmpl.failure.set(true);
	},
	'click [data-action="no-fail"]': function(evt, tmpl) {
		evt.preventDefault();
		tmpl.failure.set(false);
	}	
});

