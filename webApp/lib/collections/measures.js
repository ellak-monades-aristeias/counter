Measurements = new Mongo.Collection("measurements");

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
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}

TabularTables.Measurements = new Tabular.Table({
  name: "MeasurementsList",
  collection: Measurements,
  columns: [
    {
      data: "createdAt",
      title: "Ημερομηνία",
      render: function(val, type, doc) {
        return moment(val).format('DD/MM/YYYY, hh:mm a');
      }
    },
    {data: "value", title: "Τιμή"},
    {data: "hydroMeter", title: "Υδρόμετρο"},
    {data: "failure", title: "Αποτυχία"},
    {data: "failureOption", title: "Λόγος αποτυχίας"},
    {data: "failureText", title: "Παρατήρηση"}
  ],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});