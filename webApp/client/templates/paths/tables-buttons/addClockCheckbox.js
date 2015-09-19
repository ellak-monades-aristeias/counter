Template.addClockCheckbox.events({
	'click [data-action="addToPath"]': function(evt, tmpl) {
		evt.preventDefault();
		var clockId = this._id;
		var pathId = Router.current().params._id;

		console.log("clock: " + clockId);
		console.log("path: " + pathId);

		Meteor.call('paths.addClock', pathId, clockId);

	}
});