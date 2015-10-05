Template.Comments.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();
		var text = tmpl.find('textarea[name=text]').value;
		Meteor.call('comments.insert', text);
		tmpl.find('form').reset();
	}
});