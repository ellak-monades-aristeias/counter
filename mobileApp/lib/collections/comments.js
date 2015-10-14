Comments = new Mongo.Collection('comments');

Comments.attachSchema(new SimpleSchema({
    text: {
        type: String,
        label: "Σχόλιο",
        optional:false,
        max: 300
    },
    photo: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
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
  'comments.insert': function(opts) {
    check(opts.text, String);
    return Comments.insert(opts);
  }
});

// Offline
if (Meteor.isCordova) Ground.Collection(Comments);
if (Meteor.isClient) Ground.methodResume(['comments.insert']);



