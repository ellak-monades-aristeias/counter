Template.Path.onCreated(function () {
	var id = Router.current().params._id;
	PathNClocks = subsCache.subscribe('path&clocks',id);
});


Template.Path.helpers({
	path: function () {
		var id = Router.current().params._id;
		return Paths.findOne({_id: id});
	},
	clocks: function() {
		//filter only those in this path,
		var id = Router.current().params._id;
		var pth = Paths.findOne({_id: id});
		var clocks = pth.clocks || [];
		return Clocks.find({_id: {$in: clocks}},{sort: {pathcode: 1}});
	}
});

Template.Path.events({
	'click [data-action="goMeasure"]': function (evt,tmpl) {
		evt.preventDefault();
		var id = this._id
		Session.set('whereTo', 'nextClock');
		Router.go('measure', {_id: id});
	}
});






















