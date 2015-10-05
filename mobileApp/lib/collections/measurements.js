Measurements = new Mongo.Collection("measurements");

Measurements.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.counter = userId;
});

Measurements.after.insert(function (userId, doc) {
  Clocks.update({ hydroMeter: doc.hydroMeter, location: { $exists: false } }, { $set: { location: doc.location } }, {validate: false});
});



Meteor.methods({
	'measurements.insert': function (opts) {

		return Measurements.insert(opts);
	},
	'measurements.insert.failure': function (opts) {

		return Measurements.insert(opts);		
	}	
});



// Offline
if (Meteor.isCordova) Ground.Collection(Measurements);

if ( Meteor.isClient ) Ground.methodResume(['measurements.insert', 'measurements.insert.failure']);