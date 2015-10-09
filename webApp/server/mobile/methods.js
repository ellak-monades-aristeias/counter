Meteor.methods({

	'fetchClockByBarcode': function (barcode) {
		var clock = Clocks.findOne({barcode: barcode},{fields: {hydroMeter:1, name:1} });
		console.log(clock)
		return clock;
	},

	'fetchClockByHydro': function (hydroMeter) {
		var clock = Clocks.findOne({hydroMeter: hydroMeter},{fields: {hydroMeter:1, name:1}});
		console.log(clock)
		return clock;
	}
});


































