Template.PathMap.helpers({
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	}	
});


Template.PathMap.onCreated(function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
  this.mapRendered = false;
  this.bottomLeft = new ReactiveVar;
  this.topRight = new ReactiveVar;
  this.markers = {};

  this.setBounds = function(bounds) {
    if (!bounds) {
      var bounds = this.map.getBounds();
    }
    if (bounds) {
      this.bottomLeft.set([bounds._southWest.lng, bounds._southWest.lat]);
      this.topRight.set([bounds._northEast.lng, bounds._northEast.lat]);
    }    
  };
  var template = this;
  var pathId = Router.current().params._id;
  template.autorun(function() {
    template.subscribe('ClocksforPathMap', pathId, template.bottomLeft.get(), template.topRight.get());
  });
});

Template.PathMap.onRendered(function() {
  var template = this;
  template.autorun(function() {
    if (Geolocation.latLng()) {
      latitude = Geolocation.latLng().lat;
      longitude = Geolocation.latLng().lng;
      
      if (!template.mapRendered) {
        template.map = L.map('pathMap',{
          scrollWheelZoom: false,
          touchZoom : false
        }).setView([latitude, longitude], 15);
        template.mapRendered = true;
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(template.map);
        template.setBounds();
        template.map.on('moveend', function(event) {
          bounds = event.target.getBounds();
          template.setBounds(bounds);
        });
      }
    }
  });
});

Template.PathMap.onRendered(function() {
  var template = this;

  template.autorun(function() {
    if (template.subscriptionsReady()) {

      Clocks.find().observeChanges({
        'added': function(id, clock) {
          if (!template.markers[id]) {
            var coordsArray = [clock.location.coordinates[1], clock.location.coordinates[0]];
            template.markers[id] = new L.marker(coordsArray, {
              icon: createIcon(),
              draggable: true,
              riseOnHover: true
            });

            template.map.addLayer(template.markers[id]);
            template.markers[id].bindPopup(Blaze.toHTMLWithData(Template.marker, clock));
          }
        },
        'removed': function(id) {
          template.map.removeLayer(template.markers[id]);
          template.markers[id] = undefined;
        }
      });

    }
  });

});


var createIcon = function() {
  var className = 'leaflet-div-icon';
  return L.divIcon({
    iconSize: [30, 30],
    className: className  
  });
}


Template.pathMarker.helpers({
  clockname: function () {
    return this.firstname + ' ' + this.lastname;
  }
});
