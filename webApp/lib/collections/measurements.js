Measurements = new Mongo.Collection("measurements");

Measurements.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.counter = userId;
});

Measurements.after.insert(function (userId, doc) {
  Clocks.update({ hydroMeter: doc.hydroMeter, location: { $exists: false } }, { $set: { location: doc.location } });
});

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

if (Meteor.isServer) {
  Measurements.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Measurements.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}

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