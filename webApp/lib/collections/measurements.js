Measurements = new Mongo.Collection("measurements");

Measurements.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.counter = userId;
});

Measurements.after.insert(function (userId, doc) {
  if (doc.location) {
    Clocks.update({ hydroMeter: doc.hydroMeter, location: { $exists: false } }, { $set: { location: doc.location } }, {validate: false});
  }
});

if (Meteor.isServer) {

  Meteor.methods({  
    'measurements.insert': function (opts) {
      console.log("opts");
      console.log(opts);
      return Measurements.insert(opts);
    },
    'measurements.insert.failure': function (opts) {
      console.log("opts");
      console.log(opts);
      return Measurements.insert(opts); 
    }
  });

}


if (Meteor.isServer) {
  Measurements.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}

Measurements.helpers({
  outcome: function () {
    return this.failure ? "Ναι" : "Όχι"; 
  },
  getCounter: function () {
    var user = Meteor.users.findOne({_id:this.counter});
    return user;
  },
  getClock: function () {
    return Clocks.findOne({hydroMeter: this.hydroMeter});
  }
});

TabularTables.Measurements = new Tabular.Table({
  name: "MeasurementsList",
  autoWidth: false,
  collection: Measurements,
  columns: [
    {
      data: "createdAt",
      title: "Ημερομηνία",
      render: function(val, type, doc) {
        return moment(val).format('DD/MM/YYYY, hh:mm a');
      }
    },
    {data: "hydroMeter", title: "Υδρόμετρο"},
    {data: "value", title: "Τιμή"},
    {data: "outcome()", title: "Αποτυχία"},
    {tmpl: Meteor.isClient && Template.detailsBtn}
  ],
  extraFields: ['failure'],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});