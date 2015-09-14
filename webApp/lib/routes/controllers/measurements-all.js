MeasurementsAllController = RouteController.extend({
  subscriptions: function () {
    this.subscribe('measurements.all').wait();
  },

  data: function () {
    // return a global data context like this:
    // Items.findOne({_id: this.params._id});
  },

  action: function () {
    this.render('MeasurementsAll', { /* data: {} */});
  }
});
