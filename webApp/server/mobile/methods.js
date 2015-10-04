Meteor.methods({

	'fetchClockByBarcode': function (barcode) {
		var clock = Clocks.findOne({barcode: barcode},
								   {fields: {hydroMeter:1, barcode:1, pathcode: 1, name:1, location: 1}});
		console.log(clock)
		return clock;
	},

	'fetchClockByHydro': function (hydroMeter) {
		var clock = Clocks.findOne({hydroMeter: hydroMeter},
								   {fields: {hydroMeter:1, barcode:1, pathcode:1, name:1, location: 1}});
		console.log(clock)
		return clock;
	},

	'measurements.insert': function (opts) {

		console.log("opts");
		console.log(opts);

		return Measurements.insert(opts);
	},

	'measurements.insert.failure': function (opts) {

		console.log("opts");
		console.log(opts);

		return Measurements.insert(opts);	
	},

	'comments.insert': function(text) {
		check(text, String);
		return Comments.insert({text: text});
	}	

});


































