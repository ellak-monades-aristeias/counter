/* Global publications */ 
Meteor.publish(null, function () { 
    return Meteor.roles.find({})
});
/* *** */

Meteor.publish('clocks.one', function (id) {
    check(id,String);
    var lastMeasurement = Clocks.findOne({_id: id}).getlastMeasurement();
    if (lastMeasurement) {
        var MeasurementId = lastMeasurement._id
    }

    return [ Clocks.find({_id: id}), Measurements.find({_id: MeasurementId}) ];
});


Meteor.publish('ClocksforMap', function(bottomLeft, topRight) {
  if (!bottomLeft && !topRight) {
    return [];
  }
  clocks = Clocks.find({location: { $exists: true }, location: {$geoWithin: {$box: [bottomLeft, topRight]}}});
  return clocks;
});


Meteor.publish('measurements.one', function (id) {
    check(id,String);
    var clockId = Measurements.findOne({_id: id}).getClock()._id;
    var counterId = Measurements.findOne({_id: id}).getCounter()._id;

    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return [ Measurements.find({_id: id}),
        Clocks.find({_id: clockId}),
        Meteor.users.find({_id: counterId})]
    } else {
        this.ready();
    }
});

Meteor.publish('paths.one', function (id) {
    check(id,String);
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Paths.find({_id: id});
    } else {
        this.ready();
    }
});

Meteor.publish('comments.one', function (id) {
    check(id,String);
    var authorId = Comments.findOne({_id: id}).getAuthor()._id;
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return [ Comments.find({_id: id}), Meteor.users.find({_id: authorId},{fields: {profile: 1, username:1} }) ];
    } else {
        this.ready();
    }
});

Meteor.publish('comments.all', function () {
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Meteor.users.find({},{fields: {username:1} });
    } else {
        this.ready();
    }
});


Meteor.publish('counters.one', function (id) {
    check(id,String);
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Meteor.users.find({_id: id},{fields: {profile: 1, username:1, emails:1, roles:1} });
    } else {
        this.ready();
    }
});

































