var PER_PAGE = 10;

Template.Path.onCreated(function () {
	var id = Router.current().params._id;
	PathNClocks = subsCache.subscribe('path&clocks',id);
	this.limit = new ReactiveVar(PER_PAGE);
});

Template.Path.helpers({
	path: function () {
		var id = Router.current().params._id;
		return Paths.findOne({_id: id});
	},
	perPage: function () {
		//filter only those in this path,
		var id = Router.current().params._id;
		var pth = Paths.findOne({_id: id});
		var clocks = pth.clocks || [];
		var instance = Template.instance		
		return Clocks.find({_id: {$in: clocks}},{sort: {pathcode: 1}, limit: Template.instance().limit.get() }).count() > PER_PAGE;
	},
	clocks: function() {
		//filter only those in this path,
		var id = Router.current().params._id;
		var pth = Paths.findOne({_id: id});
		var clocks = pth.clocks || [];
		var instance = Template.instance
		return Clocks.find({_id: {$in: clocks}},{sort: {pathcode: 1}, limit: Template.instance().limit.get() });
	}
});

Template.Path.events({
	'click [data-action="goMeasure"]': function (evt,tmpl) {
		evt.preventDefault();
		var id = this._id
		Session.set('whereTo', 'nextClock');
		Router.go('measure', {_id: id});
	},
	'click [data-action="loadmore"]': function (evt,tmpl) {
		evt.preventDefault();
		tmpl.limit.set(tmpl.limit.get() + PER_PAGE)
	}
});






















