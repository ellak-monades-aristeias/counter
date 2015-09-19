Template.pathAddClocks.events({
	'click [data-action="addClocksToPath"]': function(evt, tmpl) {
		evt.preventDefault();
		console.log(this._id);
		Router.go('paths.addclocks', {_id: this._id});
	}
});