Meteor.methods({
	'fetchClockByBarcode': function (barcode) {
		console.log("called from mobile device")
		var clock = Clocks.findOne({barcode: barcode},
									{fields: {hydroMeter:1, barcode:1, name:1, location: 1}});
		console.log(clock)
		return clock;
	},

	'fetchClockByHydro': function (hydroMeter) {
		console.log("called from mobile device")
		var clock = Clocks.findOne({hydroMeter: hydroMeter},
									{fields: {hydroMeter:1, barcode:1, name:1, location: 1}});
		console.log(clock)
		return clock;
	},

	'measurements.insert': function (opts) {

		console.log("opts from device:")
		console.log(opts)

		var loc = opts.location;
		console.log(loc);

		Clocks.update({hydroMeter: opts.hydroMeter}, { $set: { location: loc}}, {validate: false});		

		var counter = this.userId;

		return Measurements.insert({
			hydroMeter: opts.hydroMeter,
			failure: opts.failure,
			value: opts.value,
			createdAt: opts.createdAt,
			location: opts.location,
			byCounter: counter
		});
	},
	'measurements.insert.failure': function (opts) {

		var counter = this.userId;

		return Measurements.insert({
			hydroMeter: opts.hydroMeter,
			failure: opts.failure,
			failureOption: opts.failureOption,
			failureText: opts.failureText,
			createdAt: opts.createdAt,
			byCounter: counter
		});
	}

});


// Measurements

































