Template.measureFields.onRendered(function () {
	console.log("measure fields rendered");
});

Template.measureFields.events({
	'submit form#success': function(evt, tmpl) {
		evt.preventDefault();

		var hydroMeter = this.hydroMeter,
			value = tmpl.$('input[name=measuredValue]').val();

		var basicOpts = {
			hydroMeter: hydroMeter,
			failure: false,
			value: value
		};			

		//check if clock has location field saved with actual coordinates
		var location = this.location;
		var coordinates = location && this.location.coordinates;
		var compactCoordinates = _.compact(coordinates);
		var coordinatesLenght = compactCoordinates.length;

		var	loc = Geolocation.latLng();
		if (loc) {
			var geolocation = {
				location: {
					type: "Point",
					coordinates: [loc.lng, loc.lat]
				} 
			}
		}

		console.log("geolocation:");
		console.log(JSON.stringify(geolocation));		

		// if location is saved and geolocation failed use saved location
		var opts;
		if ( !loc && coordinatesLenght > 0 ) {
			opts = _.extend(basicOpts, location);
		} else {
			opts = _.extend(basicOpts, geolocation);
		}

		//Get the next Clock in the Path
		var pathcode = this.pathcode;
		var nextClock = Clocks.findOne({pathcode: {$gt:  pathcode} },{sort: {pathcode: 1}});
		if (nextClock) {
			var nextClockId = nextClock._id;
		}

		//confirm	
		var ConfirmMeasure = function (opts, nextClockId) {

		 	swal({
			  title: "Επιβεβαίωση", 
			  text: "Είναι σωστή η τιμή " + opts.value + " ;" , 
			  type: "warning",
			  showCancelButton: true,
			  closeOnConfirm: true,
			  confirmButtonText: "Ναι",
			  confirmButtonColor: "#ec6c62"
			}, function() {
				Meteor.call('measurements.insert',opts);

				if ( Session.equals('whereTo', 'search') ) {
					Router.go('search');
				} else {
					if (nextClockId) { 
						Router.go('measure', {_id: nextClockId});
					} else {
						Router.go('paths');
					}
				}

			});

		}; 

		//make the call
		if (value) {
			console.log(JSON.stringify(opts));
			ConfirmMeasure(opts, nextClockId);

		} else {
			swal("Oops", "Δεν υπάρχει τιμή", "error");
		}


	}
});



