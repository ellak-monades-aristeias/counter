Template.addClockBtn.events({
	'click [data-action="addToPath"]': function(evt, tmpl) {
		evt.preventDefault();
		var clockId = this._id;
		var pathId = Router.current().params._id;
		Meteor.call('paths.addClock', pathId, clockId);
	}
});