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

Meteor.publish('counters.all', function (/* args */) {
    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return Meteor.users.find();
    } else {
        this.ready();
    }
});


Meteor.publish('measurements.all', function (/* args */) {
    return Measurements.find();
});


Meteor.publish('clocks.test', function (/* args */) {
    return Clocks.find();
});

Meteor.publish('paths.one', function (id) {
    check(id,String);
    return Paths.find({_id: id});
});

