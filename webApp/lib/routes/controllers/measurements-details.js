MeasurementsDetailsController = RouteController.extend({
    subscriptions: function () {
        this.subscribe('measurements.one', this.params._id).wait();
    },

    data: function () {
        return Measurements.findOne({_id: this.params._id});
    },

    action: function () {
        this.render('MeasurementsDetails');
    }    
});
