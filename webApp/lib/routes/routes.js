Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.route('/clocks', {
  name: 'clocks.all',
  controller: 'ClocksAllController',
  action: 'action',
  where: 'client'
});

Router.route('/clocks/new', {
  name: 'clocks.new',
  controller: 'ClocksNewController',
  action: 'action',
  where: 'client'
});

Router.route('/clocks/:_id', {
  name: 'clocks.details',
  controller: 'ClocksDetailsController',
  action: 'details',
  where: 'client'
});

Router.route('/clocks/:_id/edit', {
  name: 'clocks.edit',
  controller: 'ClocksDetailsController',
  action: 'edit',
  where: 'client'
});

Router.route('/counters', {
  name: 'counters.all',
  controller: 'CountersAllController',
  action: 'action',
  where: 'client'
});

Router.route('/counters/new', {
  name: 'counters.new',
  controller: 'CountersNewController',
  action: 'action',
  where: 'client'
});

Router.route('/paths', {
  name: 'paths.all',
  controller: 'PathsAllController',
  action: 'action',
  where: 'client'
});

Router.route('/paths/:_id/edit', {
  name: 'paths.edit',
  controller: 'PathsDetailsController',
  action: 'edit',
  where: 'client'
});

Router.route('/paths/:_id/add', {
  name: 'paths.addclocks',
  controller: 'PathsDetailsController',
  action: 'addClock',
  where: 'client'
});

Router.route('/measurements', {
  name: 'measurements.all',
  controller: 'MeasurementsAllController',
  action: 'action',
  where: 'client'
});

Router.route('/measurements/:_id', {
  name: 'measurements.details',
  controller: 'MeasurementsDetailsController',
  action: 'action',
  where: 'client'
});


Router.route('/comments', {
  name: 'comments',
  action: function () {
    this.render('Comments');
  }
});



Router.plugin('ensureSignedIn', {
    except: ['home', 'atSignIn']
});




















