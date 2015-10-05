Template.failFiels.onCreated(function () {
	this.PhotoDir = new ReactiveDict();
	this.PhotoDir.set('photo', null);

});

Template.failFiels.onDestroyed(function () {
	// this.PhotoDir.set('photo', null);
});

Template.failFiels.onRendered(function () {
	this.$('select.dropdown').dropdown();
});

Template.failFiels.helpers({
	failureOptions: function () {
		var options = [
			'ΜΕΤΡΗΤΗΣ ΣΤΑΣΙΜΟΣ',
			'ΜΕΤΡΗΤΗΣ ΚΑΤΕΣΤΡΑΜΜΕΝΟΣ',
			'ΤΖΑΜΙ ΣΠΑΣΜΕΝΟ',
			'ΑΛΛΟ'
		];
		return options;
	},
	photo: function () {
		return Template.instance().PhotoDir.get('photo');
	}	
});

Template.failFiels.events({
	'submit form': function (evt, tmpl) {
		evt.preventDefault();

		var hydroMeter = this.hydroMeter,
			failureOption = tmpl.$('#failure-option').val();
			failureText = tmpl.find('textarea[name=failureText]').value || '';

		var basicOpts = {
			hydroMeter: hydroMeter,
			failure: true,
			failureDetails: {
				failureOption: failureOption,
				failureText: failureText
			}
		}		

		//check if clock has location field saved
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
		var ConfirmFail = function (opts, nextClockId) {

		 	swal({
			  title: "Επιβεβαίωση", 
			  text: "Είναι σωστές οι επιλογές, " + opts.failureDetails.failureOption + " " + opts.failureDetails.failureText + " ;" , 
			  type: "warning",
			  showCancelButton: true,
			  closeOnConfirm: true,
			  confirmButtonText: "Ναι",
			  confirmButtonColor: "#ec6c62"
			}, function() {
				Meteor.call('measurements.insert.failure',opts);

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
		if (failureOption) {
			console.log(JSON.stringify(opts));
			ConfirmFail(opts, nextClockId);

		} else {
			swal("Oops", "Πρέπει τουλαχιστον να συμπληρωθεί ο λόγος", "error");
		}		

	},
	'click [data-action="photo"]': function (evt,tmpl) {
		evt.preventDefault();

		var cameraOptions = {
			width: 300,
			height: 300
		};
		
		MeteorCamera.getPicture(cameraOptions, function (error, data) {
			tmpl.PhotoDir.set('photo', data);
		});

	}
});















