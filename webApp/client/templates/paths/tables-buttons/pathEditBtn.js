Template.pathEditBtn.events({
	'click [data-action="editPath"]': function(evt, tmpl) {
		evt.preventDefault();
		console.log(this._id);
		Router.go('paths.edit', {_id: this._id});
	}
});