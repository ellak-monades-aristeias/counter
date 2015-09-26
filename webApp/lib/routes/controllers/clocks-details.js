ClocksDetailsController = RouteController.extend({
    subscriptions: function () {
        this.subscribe('clocks.one', this.params._id).wait();
    },

    data: function () {
        return Clocks.findOne({_id: this.params._id});
    },

    // addClock: function () {
    //     this.render('PathsAddClocks', { /* data: {} */});
    // },

    edit: function () {
        this.render('ClocksEdit', { /* data: {} */});
    }    
});
