

Meteor.publish('clocks.all', function (/* args */) {
  if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
    return Clocks.find();
  } else {
    this.ready();
  }
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

