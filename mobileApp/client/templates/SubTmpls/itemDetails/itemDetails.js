Template.itemDetails.helpers({
	loc: function () {
		var	loc = Geolocation.latLng();
		if (loc) console.log('location helper');
		return loc;
	},
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},
	itemSavedLocation: function () {
		var id = Router.current().params._id;
		var clock = Clocks.findOne({_id: id});
		var coordinates = clock.location.coordinates	
		return coordinates && coordinates.join(',') || 'not exists';

	}
});
