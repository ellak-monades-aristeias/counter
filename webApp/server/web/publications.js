/* Global publications */ 
Meteor.publish(null, function () { 
    return Meteor.roles.find({})
});
/* *** */

Meteor.publish('clocks.one', function (id) {
    check(id,String);
    return Clocks.find({_id: id});
});

Meteor.publish('measurements.one', function (id) {
    check(id,String);
    var clockId = Measurements.findOne({_id: id}).getClock()._id;

    if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
        return [Measurements.find({_id: id}), Clocks.find({_id: clockId})]
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

