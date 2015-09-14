Router.configure({
  layoutTemplate: 'Layout',
  // controller: 'AppController',
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

Router.route('/measurements', {
  name: 'measurements.all',
  controller: 'MeasurementsAllController',
  action: 'action',
  where: 'client'
});