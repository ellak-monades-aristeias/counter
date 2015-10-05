Meteor.publish('paths', function () {
    return Paths.find({},{ fields: { name:1 } });
});

Meteor.publish('path&clocks', function (id) {

	var pth = Paths.findOne({_id: id});
	var clocks = pth.clocks || []; // array of clocks id

    return [ Paths.find({_id: id}),
    		 Clocks.find({_id: {$in: clocks}},
    					 {fields: {hydroMeter:1, barcode:1, pathcode: 1, name:1, location: 1} }) ]
});

Meteor.publish('clock.one', function (id) {
    return Clocks.find({_id: id},
					   {fields: {hydroMeter:1, barcode:1, pathcode: 1, name:1, location: 1} });
});