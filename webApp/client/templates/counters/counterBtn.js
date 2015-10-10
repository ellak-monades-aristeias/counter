Template.counterBtn.events({
	'click [data-action="editCounter"]': function(evt, tmpl) {
		evt.preventDefault();
		Router.go('counters.edit', {_id: this._id});
	}
});