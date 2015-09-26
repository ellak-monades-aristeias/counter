Template.editClockBtn.events({
	'click [data-action="editClock"]': function(evt, tmpl) {
		evt.preventDefault();
		Router.go('clocks.edit', {_id: this._id});
	}	
});
