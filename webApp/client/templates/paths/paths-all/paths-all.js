Template.PathsAll.onCreated(function () {
	this.addNew = new ReactiveVar(false);
});

Template.PathsAll.helpers({
	addnew: function () {
		return Template.instance().addNew.get();
	}
});

Template.PathsAll.events({
	'click [data-action="addNew"]': function(evt, tmpl) {
		evt.preventDefault();
		if ( tmpl.addNew.get() ) {
			tmpl.addNew.set(false);	
		} else {
			tmpl.addNew.set(true);
		}
	}	
});
