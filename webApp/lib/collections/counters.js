Users = Meteor.users;

var Schemas = {}

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
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
        optional: true
    }

});

Users.attachSchema(Schemas.User);




Meteor.users.helpers({
  // mail: function() {
  //   return this.emails.address;
  // },
  // role: function() {
  // 	return this.roles[0];
  // },
  joined: function() {
    return moment(this.createdAt).format('DD/MM/YYYY');
  }
 });


TabularTables.Users = new Tabular.Table({
	name : "userList",
	collection: Users,
	columns: [
		// {data: "fullName()", title: "Full Name"},
        {data: "username", title: "Username"},
        // {data: "mail()", title: "Email"},
        // {data: "role()", title: "Role"},
		{data: "joined()", title: "Joined"},
		// {tmpl: Meteor.isClient && Template.usrbtn}
	],
  allow: function(userId) {
    return userId || Roles.userIsInRole(userId,['admin']);
  }
});


// if (Meteor.isServer) {

//   Meteor.users.deny({
//     update: function() {
//       return true;
//     }
//   });

// }


























