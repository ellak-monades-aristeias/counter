HomeController = RouteController.extend({
  subscriptions: function () {
    // this.subscribe('unities').wait();
    // this.subscribe('mycategories').wait();
  },

  data: function () {
    // return a global data context like this:
    // Items.findOne({_id: this.params._id});
  },

  action: function () {
    this.render('Home', { /* data: {} */});
  }
});
