var addNew = new ReactiveVar(false);

Template.PathsAll.onCreated(function () {
	addNew.set(false);
});


Template.PathsAll.onRendered(function () {
	// console.log("paths rendered");
});

Template.PathsAll.helpers({
	addnew: function () {
		return addNew.get();
	}
});

Template.PathsAll.events({
	'click [data-action="addNew"]': function(evt, tmpl) {
		evt.preventDefault();
		addNew.set(true);
	}
});


var hook = {
    onSuccess: function (formType, result) {
       	addNew.set(false);       
    }
}


AutoForm.addHooks('insertPathsForm', hook);
