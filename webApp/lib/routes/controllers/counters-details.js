CountersDetailsController = RouteController.extend({
    subscriptions: function () {
        this.subscribe('counters.one', this.params._id).wait();
    },

    data: function () {
        return Meteor.users.findOne({_id: this.params._id});
    },

    action: function () {
        this.render('CounterDetails');
    }    
});
