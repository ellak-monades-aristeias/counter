Template.ClocksDetails.events({
	'click [data-action="editClock"]': function(evt, tmpl) {
		evt.preventDefault();
		Router.go('clocks.edit', {_id: this._id});
	},
	'click [data-action="deleteClock"]': function(evt, tmpl) {
		evt.preventDefault();
		var clockId = this._id;
		ConfirmDelete(clockId);

	}	
});

//confirm	
var ConfirmDelete = function (clockId) {

 	swal({
	  title: "Επιβεβαίωση", 
	  text: "Να διαγραφεί αυτό το έγγραφο;" , 
	  type: "warning",
	  showCancelButton: true,
	  closeOnConfirm: true,
	  confirmButtonText: "Ναι",
	  confirmButtonColor: "#ec6c62"
	}, function() {
		Meteor.call('clocks.delete', clockId ,function (error, result) {
			if (error) console.log(error);

			Router.go('clocks.all');
		});		
	});

};