Template.CommentsDetails.events({
	'click [data-action="deleteComment"]': function (evt,tmpl) {
		evt.preventDefault();
		var commentId = this._id;
		ConfirmDeleteComment(commentId);		
	}
});

//confirm	
var ConfirmDeleteComment = function (commentId) {

 	swal({
	  title: "Επιβεβαίωση", 
	  text: "Να διαγραφεί αυτό το σχόλιο;" , 
	  type: "warning",
	  showCancelButton: true,
	  closeOnConfirm: true,
	  confirmButtonText: "Ναι",
	  confirmButtonColor: "#ec6c62"
	}, function() {
		Meteor.call('comments.delete', commentId ,function (error, result) {
			if (error) console.log(error);

			Router.go('comments');
		});		
	});

};