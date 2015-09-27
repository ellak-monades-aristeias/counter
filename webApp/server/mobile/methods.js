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

		var loc = opts.location;
		console.log(loc);

		Clocks.update({hydroMeter: opts.hydroMeter}, { $set: { location: loc}}, {validate: false});		

		// var counter = this.userId;

		return Measurements.insert({
			hydroMeter: opts.hydroMeter,
			failure: opts.failure,
			value: opts.value,
			location: opts.location
		});
	},
	'measurements.insert.failure': function (opts) {


		// return Measurements.insert({
		// 	hydroMeter: opts.hydroMeter,
		// 	failure: opts.failure,
		// 	failureOption: opts.failureOption,
		// 	failureText: opts.failureText
		// });



		var failureDetails = {
			failureOption: opts.failureOption,
			failureText: opts.failureText			
		}

		return Measurements.insert({
			hydroMeter: opts.hydroMeter,
			failure: opts.failure,
			failureDetails: failureDetails
		});		
	},
	'comments.insert': function(text) {
		check(text, String);
		return Comments.insert({text: text});
	}	

});


































