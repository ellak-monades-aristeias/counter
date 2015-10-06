Template.detailsCommentsBtn.events({
	'click [data-action="detailsComments"]': function(evt, tmpl) {
		evt.preventDefault();
		Router.go('comments.details', {_id: this._id});
	}	
});