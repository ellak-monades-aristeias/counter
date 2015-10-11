Clocks = new Mongo.Collection("clocks");

Clocks.attachSchema(new SimpleSchema({
	firstname: {
		type: String,
		label: "Όνομα",
		optional: false,
		max: 60
	},
  lastname: {
    type: String,
    label: "Επίθετο",
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
	},
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }  
}));

Clocks.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
});

Clocks.helpers({
  getlastMeasurement : function () {
    var m = Measurements.findOne({hydroMeter: this.hydroMeter},{sort: {createdAt: -1}});
    return m;
  },
  fullname: function () {
    return this.firstname + " " + this.lastname;
  }
});


if (Meteor.isServer) {
  Clocks.allow({
    insert: function (userId, doc) {
      return Roles.userIsInRole(userId,['admin']);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Roles.userIsInRole(userId,['admin']);;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'clocks.insert': function(opts) {
      console.log(opts);
      return Clocks.insert(opts);
    },
    'clocks.delete' : function (clockId) {
      check(clockId, String);
      var pth = Paths.findOne({clocks: clockId});
      if (pth) {
        var pathId = pth._id;
        Paths.update(pathId, { $pull: { clocks: clockId }});
      }
      return Clocks.remove(clockId);
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
    {data: "hydroMeter", title: "Υδρόμετρο"},
    {data: "fullname()", title: "Ονοματεπώνυμο/Υπόχρεος"},
    {data: "address", title: "Διεύθυνση"},
    {data: "topiki", title: "Τ.Π.(Τοπική Κοινότητα)"},
    {data: "pathcode", title: "Κωδικός Διαδρομής"},
    {data: "timologio", title: "Τιμολόγιο"},
    {tmpl: Meteor.isClient && Template.detailsClockBtn},
    {tmpl: Meteor.isClient && Template.editClockBtn}
  ],
  extraFields: ['firstname','lastname'],
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
    {data: "fullname()", title: "Ονοματεπώνυμο/Υπόχρεος"},
    {data: "address", title: "Διεύθυνση"},
    {data: "topiki", title: "Τ.Π.(Τοπική Κοινότητα)"},
    {data: "pathcode", title: "Κωδικός Διαδρομής"},    
    {tmpl: Meteor.isClient && Template.addClockBtn}
  ],
  extraFields: ['firstname','lastname'],
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
    {data: "fullname()", title: "Ονοματεπώνυμο/Υπόχρεος"},
    {data: "address", title: "Διεύθυνση"},
    {data: "topiki", title: "Τ.Π.(Τοπική Κοινότητα)"},
    {data: "pathcode", title: "Κωδικός Διαδρομής"},    
    {tmpl: Meteor.isClient && Template.removeClockBtn}
  ],
  extraFields: ['firstname','lastname'],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});
