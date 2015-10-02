var editPathName = new ReactiveVar(false);

Template.PathsEdit.helpers({
	selector: function () {
		var clocks = this.clocks;
		return {_id: {$in: clocks}};
	},
	editName: function () {
		return editPathName.get();
	}	
});

Template.PathsEdit.events({
	'click [data-action="editPathName"]': function(evt, tmpl) {
		evt.preventDefault();
		editPathName.set(true);
	}
});

Template.PathsEdit.onRendered(function () {
	// console.log('PathsEdit') 
});

var editPathNameHook = {
    onSuccess: function (formType, result) {
       	editPathName.set(false);
    }
}

AutoForm.addHooks('updatePathNameForm', editPathNameHook);