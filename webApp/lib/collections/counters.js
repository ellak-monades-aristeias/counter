Users = Meteor.users;

var Schemas = {}

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    }    
})

Schemas.User = new SimpleSchema({
    profile: {
        type: Schemas.UserProfile,
        optional: true
    },
    username: {
        type: String,
        label: "Username",
        optional: false,
        max: 60        
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
            omit: true
        }
    },    
    createdAt: {
        type: Date,
        optional: true,
        autoform: {
            omit: true
        }
    },
    roles: {
        type: [String],
        optional: true,
        allowedValues: ["admin", "counter"],
        autoform: {
          options: [
            {label: "ΔΙΑΧΕΙΡΗΣΤΗΣ", value: "admin"},
            {label: "ΚΑΤΑΜΕΤΡΗΤΗΣ", value: "counter"}
          ]
        }        
    }    

});

Users.attachSchema(Schemas.User);




Meteor.users.helpers({
  mail: function() {
    return this.emails[0].address;
  },
  fullname: function () {
    var firstandlast = this.profile.firstName + " " + this.profile.lastName;
    return firstandlast
  },
  role: function() {
  	return this.roles[0];
  },  
  joined: function() {
    return moment(this.createdAt).format('DD/MM/YYYY');
  }
});

if (Meteor.isServer) {
  Users.allow({
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


TabularTables.Users = new Tabular.Table({
	name : "userList",
    autoWidth: false,
	collection: Meteor.users,
	columns: [
        {data: "fullname()", title: "Ονοματεπώνυμο"},        
        {data: "username", title: "Username"},
        {data: "mail()", title: "Email"},
        {data: "role()", title: "Ρόλος"},
		{data: "joined()", title: "Joined"},
		{tmpl: Meteor.isClient && Template.counterBtn}
	],
    extraFields: ['emails','roles','profile'],
    allow: function(userId) {
        return userId || Roles.userIsInRole(userId,['admin']);
    }
});





























