Paths = new Mongo.Collection("paths");

Paths.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Όνομα δρομολόγιου",
        optional:false,
        max: 70
    },
    clocks: {
        type: [String], // Clocks ids
        optional: true,
        autoform: {
            omit: true
        }
    }
}));

if (Meteor.isServer) {
  Paths.allow({
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

  Paths.deny({
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
}

Paths.helpers({
  clocksLength: function() {
    return this.clocks && this.clocks.length || 0 ;
  }
 });

TabularTables.Paths = new Tabular.Table({
  name: "PathsList",
  autoWidth: false,
  collection: Paths,
  columns: [
  //   {
  //     data: "createdAt",
  //     title: "Ημερομηνία",
  //     render: function(val, type, doc) {
  //       return moment(val).format('DD/MM/YYYY, hh:mm a');
  //     }
  //   },
    {data: "name", title: "'Ονομα"},
    {data: "clocksLength()", title: "Αριθμός υδρόμετρων"},
    {tmpl: Meteor.isClient && Template.pathEditBtn},
    {tmpl: Meteor.isClient && Template.pathAddClocks}
  ],
  extraFields: ['clocks'],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});








































