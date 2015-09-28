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
  topiki: {
    type: String,
    label: "Τ.Π.(Τοπική Κοινότητα)",
    optional: true,
    max: 70
  },  
	hydroMeter: {
		type: String,
		label: "Υδρόμετρο",
		optional: false,
		unique: true,
		max: 50
	},
  pathcode: {
    type: String,
    label: "Κωδικός Διαδρομής",
    optional: true,
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
  location: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
        omit: true
    }    
  },
  // "location.$.type": {
  //   type: String
  // },
  // "location.$.coordinates": {
  //   type: [Number],
  //   decimal: true
  // },  
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
  autoWidth: false,
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
    {data: "topiki", title: "Τ.Π.(Τοπική Κοινότητα)"},
    {data: "pathcode", title: "Κωδικός Διαδρομής"},
    // {data: "tel", title: "Τηλέφωνο"},
    {data: "timologio", title: "Τιμολόγιο"},
    {data: "barcode", title: "Barcode"},
    {tmpl: Meteor.isClient && Template.editClockBtn}
  ],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});








TabularTables.ClocksForPaths = new Tabular.Table({
  name: "ClocksForPaths",
  autoWidth: false,
  collection: Clocks,
  columns: [
    {data: "hydroMeter", title: "Υδρόμετρο"},
    {data: "name", title: "Ονοματεπώνυμο"},
    {data: "address", title: "Διεύθυνση"},
    {data: "topiki", title: "Τ.Π.(Τοπική Κοινότητα)"},
    {data: "pathcode", title: "Κωδικός Διαδρομής"},    
    {tmpl: Meteor.isClient && Template.addClockCheckbox}
  ],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});

TabularTables.ClocksForPathsEdit = new Tabular.Table({
  name: "ClocksForPathsEdit",
  autoWidth: false,
  collection: Clocks,
  columns: [
    {data: "hydroMeter", title: "Υδρόμετρο"},
    {data: "name", title: "Ονοματεπώνυμο"},
    {data: "address", title: "Διεύθυνση"},
    {data: "topiki", title: "Τ.Π.(Τοπική Κοινότητα)"},
    {data: "pathcode", title: "Κωδικός Διαδρομής"},    
    {tmpl: Meteor.isClient && Template.removeClockBtn}
  ],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});




























