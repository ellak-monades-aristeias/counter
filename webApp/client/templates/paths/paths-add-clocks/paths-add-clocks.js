Template.PathsAddClocks.helpers({
	selector: function () {
		var clocks = this.clocks || [];
		console.log(clocks);
		return {_id: {$nin: clocks}};

	}
});

Template.PathsAddClocks.onRendered(function () {
	console.log('PathsAddClocks');
});
