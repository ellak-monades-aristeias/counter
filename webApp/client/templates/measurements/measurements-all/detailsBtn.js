Template.detailsBtn.events({
	'click [data-action="details"]': function(evt, tmpl) {
		evt.preventDefault();
		Router.go('measurements.details', {_id: this._id});
	}	
});
