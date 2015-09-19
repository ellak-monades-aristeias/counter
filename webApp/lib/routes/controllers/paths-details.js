PathsDetailsController = RouteController.extend({
    subscriptions: function () {
        this.subscribe('paths.one', this.params._id).wait();
    },

    data: function () {
        return Paths.findOne({_id: this.params._id});
    },

    addClock: function () {
        this.render('PathsAddClocks', { /* data: {} */});
    },

    edit: function () {
        this.render('PathsEdit', { /* data: {} */});
    }    
});
