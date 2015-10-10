Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
  action: function () {
    this.render('Home');
  }  
});

Router.route('/clocks', {
  name: 'clocks.all',
  action: function () {
    this.render('ClocksAll');
  }  
});

Router.route('/clocks/map', {
  name: 'clocks.map',
  action: function () {
    this.render('ClocksMap');
  }  
});

Router.route('/clocks/new', {
  name: 'clocks.new',
  action: function () {
    this.render('ClocksNew');
  }  
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
  action: function () {
    this.render('CountersAll');
  }
});

Router.route('/counters/new', {
  name: 'counters.new',
  action: function () {
    this.render('CountersNew');
  }
});

Router.route('/paths', {
  name: 'paths.all',
  action: function () {
      this.render('PathsAll');
  }
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
  action: function () {
    this.render('MeasurementsAll');
  }  
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

Router.route('/comments/:_id', {
  name: 'comments.details',
  controller: 'CommentsDetailsController',
  action: 'action'
});



Router.plugin('ensureSignedIn', {
    except: ['home', 'atSignIn']
});




















