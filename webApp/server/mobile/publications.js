Meteor.publish('paths.names', function () {
    return Paths.find({},{ fields: { name:1 } });
});


Meteor.publish('path&clocks', function (id) {

	var pth = Paths.findOne({_id: id});

	var clocks = pth.clocks || []; // array of clocks id



    return [ Paths.find({_id: id},{ fields: { name:1 } }),
    	Clocks.find({_id: {$in: clocks}}) ]
});

Meteor.publish('clock.one.frompath', function (id) {
    return Clocks.find({_id: id}  /*, { fields: {name:1}  } */ );
});