Paths = new Mongo.Collection("paths");

// Offline
if (Meteor.isCordova) Ground.Collection(Paths);

