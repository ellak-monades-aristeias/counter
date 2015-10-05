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


// Offline
if (Meteor.isCordova) Ground.Collection(Clocks);































