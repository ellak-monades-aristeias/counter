Comments = new Mongo.Collection('comments');

Comments.attachSchema(new SimpleSchema({
    text: {
        type: String,
        label: "Σχόλιο",
        optional:false,
        max: 300
    },
    author: {
    	type: String,
    	optional: true,
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
    }
}));


Comments.helpers({
  getAuthor: function () {
    var user = Meteor.users.findOne({_id:this.author});
    return user;
  }
});

Comments.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.author = userId;  
});

if (Meteor.isServer) {
  Comments.deny({
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

if (Meteor.isServer) {

  Meteor.methods({  
    'comments.insert': function(text) {
      check(text, String);
      return Comments.insert({text: text});
    },
    'comments.delete' : function (commentId) {
      check(text, String);
      return Comments.remove(commentId);
    }
  });

}

TabularTables.Comments = new Tabular.Table({
  name : "commentList",
  autoWidth: false,
  collection: Comments,
  columns: [
    {
      data: "createdAt",
      title: "Ημερομηνία",
      render: function(val, type, doc) {
        return moment(val).format('DD/MM/YYYY, hh:mm a');
      }
    },        
    {data: "getAuthor()", title: "Χρήστης"},
    {data: "text", title: "Σχόλιο"},
    {tmpl: Meteor.isClient && Template.detailsCommentsBtn}
  ],
    extraFields: ['author'],
    allow: function(userId) {
        return userId || Roles.userIsInRole(userId,['admin']);
    }
});































