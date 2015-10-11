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

Comments.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.author = userId;
});

Meteor.methods({
  'comments.insert': function(text) {
    check(text, String);
    return Comments.insert({text: text});
  }
});

// Offline
if (Meteor.isCordova) Ground.Collection(Comments);
if (Meteor.isClient) Ground.methodResume(['comments.insert']);



