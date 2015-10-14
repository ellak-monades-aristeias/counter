Template.Comments.onCreated(function () {
	this.PhotoDir = new ReactiveDict();
	this.PhotoDir.set('photo', null);

});


Template.Comments.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();
		var text = tmpl.find('textarea[name=text]').value;

		var opts = {
			text: text
		}

		if (tmpl.PhotoDir.get('photo')) {
			opts.photo = tmpl.PhotoDir.get('photo');
		}


		Meteor.call('comments.insert', opts);
		tmpl.find('form').reset();
	},
	'click [data-action="photo"]': function (evt,tmpl) {
		evt.preventDefault();

		var cameraOptions = {
			width: 300,
			height: 300
		};
		
		MeteorCamera.getPicture(cameraOptions, function (error, data) {
			tmpl.PhotoDir.set('photo', data);
		});

	}	
});

Template.Comments.helpers({
	photo: function () {
		return Template.instance().PhotoDir.get('photo');
	}
});