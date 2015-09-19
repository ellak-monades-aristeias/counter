Template.PathsEdit.helpers({
	selector: function () {
		var clocks = this.clocks;
		return {_id: {$in: clocks}};

	}
});

Template.PathsEdit.onRendered(function () {
	// console.log('PathsEdit') 
});
