/* Global publications */
 
Meteor.publish(null, function () { 
    return Meteor.roles.find({})
});

/* *** */


Meteor.publish('clocks.all', function (/* args */) {
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Clocks.find();
    } else {
        this.ready();
    }
});

Meteor.publish('clocks.one', function (id) {
    check(id,String);
    return Clocks.find({_id: id});
});

// Meteor.publish('counters.all', function (/* args */) {
//     if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
//         return Meteor.users.find();
//     } else {
//         this.ready();
//     }
// });

Meteor.publish('measurements.all', function (/* args */) {
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Measurements.find();
    } else {
        this.ready();
    }
});

Meteor.publish('measurements.one', function (id) {
    check(id,String);
    // var clockId = Measurements.findOne({_id: id}).getClock()._id;
    var measurement = Measurements.find({_id: id}).fetch();
    var h = measurement.hydroMeter;

    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return [Measurements.find({_id: id}), Clocks.find({hydroMeter: h})]
    } else {
        this.ready();
    }
});


Meteor.publish('clocks.test', function (/* args */) {
    return Clocks.find();
});

Meteor.publish('paths.one', function (id) {
    check(id,String);
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Paths.find({_id: id});
    } else {
        this.ready();
    }
});

