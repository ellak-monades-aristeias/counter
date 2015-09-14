Clocks = new Mongo.Collection("clocks");

Clocks.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Ονοματεπώνυμο/Υπόχρεος",
		optional: false,
		max: 60
	},
	tel: {
		type: String,
		label: "Τηλέφωνο",
		optional: true,
		max: 60
	},	
	address: {
		type: String,
		label: "Διεύθυνση",
		optional: false,
		max: 70
	},
	hydroMeter: {
		type: String,
		label: "Υδρόμετρο",
		optional: false,
		unique: true,
		max: 50
	},
  barcode: {
    type: String,
    label: "Barcode",
    optional: true,
    unique: true,
    max: 50
  },  
	timologio: {
		type: String,
		label: "Τιμολόγιο",
		optional: true,
		allowedValues: ['ΓΕΝΙΚΟ', 'ΕΙΔΙΚΟ', 'ΕΠΑΓΓΕΛΜΑΤΙΚΟ'],
		autoform: {
		  options: [
		    {label: "ΓΕΝΙΚΟ", value: "ΓΕΝΙΚΟ"},
		    {label: "ΕΙΔΙΚΟ", value: "ΕΙΔΙΚΟ"},
		    {label: "ΕΠΑΓΓΕΛΜΑΤΙΚΟ", value: "ΕΠΑΓΓΕΛΜΑΤΙΚΟ"}
		  ]
		}
	}	
}));


if (Meteor.isServer) {
  Clocks.allow({
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

  Clocks.deny({
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



TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Clocks = new Tabular.Table({
  name: "ClocksList",
  collection: Clocks,
  columns: [
    // {
    //   data: "start",
    //   title: "Date",
    //   render: function(val, type, doc) {
    //     return moment(val).format('DD/MM/YYYY, hh:mm a');
    //   }
    // },
    {data: "hydroMeter", title: "Υδρόμετρο"},
    {data: "name", title: "Ονοματεπώνυμο"},
    {data: "address", title: "Διεύθυνση"},
    {data: "tel", title: "Τηλέφωνο"},
    {data: "timologio", title: "Τιμολόγιο"},
    {data: "barcode", title: "Barcode"}
    // {tmpl: Meteor.isClient && Template.rsvpsCount},
    // {tmpl: Meteor.isClient && Template.editBtn}
  ],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});




























