Template.Search.onRendered(function () {
	console.log("Search here!");
});

Template.Search.events({
	'click [data-action="getClock"]': function(evt, tmpl) {
		evt.preventDefault();
		var hydroMeter = tmpl.$('input[name=clock]').val();

		// try local first even if connected
		if (! Meteor.status().connected) {
			var groundedClock = Clocks.findOne({hydroMeter: hydroMeter});
			if (groundedClock) {
				console.log(groundedClock._id);
				var id = groundedClock._id;
				Session.set('whereTo', 'search');
				Router.go('measure', {_id: id});
			} else {
				swal("Oops", "not found, Search again", "error");
			}			
		} else {
			Meteor.call('fetchClockByHydro', hydroMeter, function (err,doc) {
				if (err) console.log(err);
				if (doc) {
					console.log(doc._id);
					var id = doc._id;
					Session.set('whereTo', 'search');
					Router.go('measure', {_id: id});
				} else {
					swal("Oops", "not found, Search again", "error");
				}
			});
		}

	},
	'click [data-action="scan"]': function(evt, tmpl) {
		evt.preventDefault();
		var params = {
			text_title: "Scan barcode",
			text_instructions: "To Barcode διαβάζεται αυτόματα",
			camera: "back",
			flash: "auto",
			drawSight: true
		};
		cloudSky.zBar.scan(params, function (result) {
			console.log(result);

			// try local first even if connected
			if (! Meteor.status().connected) {
				var groundedClock = Clocks.findOne({barcode: result});
				if (groundedClock) {
					console.log(groundedClock._id);
					var id = groundedClock._id;
					Session.set('whereTo', 'search');
					Router.go('measure', {_id: id});
				} else {
					swal("Oops", "not found, Search again", "error");
				}			
			} else {				
				Meteor.call('fetchClockByBarcode', result, function (err,doc) {
					if (err) console.log(err.reason);
					if (doc) {
						console.log(doc._id);
						var id = doc._id;
						Session.set('whereTo', 'search');
						Router.go('measure', {_id: id});
					} else {
						swal("Oops", "not found, Search again", "error");
					}
				});
			}				

		}, function (error) { alert(error); });		

	}

});