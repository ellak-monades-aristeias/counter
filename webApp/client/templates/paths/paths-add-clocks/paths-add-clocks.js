Template.PathsAddClocks.helpers({
	selector: function () {
		var clocks = this.clocks;
		return {_id: {$nin: clocks}};

	}
});

Template.PathsAddClocks.onRendered(function () {
	// console.log('PathsAddClocks') 
});
