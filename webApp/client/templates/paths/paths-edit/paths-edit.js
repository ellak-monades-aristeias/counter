Template.PathsEdit.onCreated(function () {
	this.editPathName = new ReactiveVar(false);
});

Template.PathsEdit.helpers({
	selector: function () {
		var clocks = this.clocks;
		return {_id: {$in: clocks}};
	},	
	editPathName: function () {
		return Template.instance().editPathName.get();
	}
});

Template.PathsEdit.events({
	'click [data-action="editPathName"]': function(evt, tmpl) {
		evt.preventDefault();
		if ( tmpl.editPathName.get() ) {
			tmpl.editPathName.set(false);	
		} else {
			tmpl.editPathName.set(true);
		}
	}	
});