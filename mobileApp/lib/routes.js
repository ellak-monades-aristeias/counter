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

Router.route('/search', {
  name: 'search',
  action: function () {
    this.render('Search');
  }
});

Router.route('/paths', {
  name: 'paths',
  action: function () {
    this.render('Paths');
  }  
});

Router.route('/path/:_id', {
  name: 'path',
  action: function () {
    this.render('Path');
  }
});

Router.route('/measure/:_id', {
  name: 'measure',
  action: function () {
    this.render('Measure');
  }
});

Router.route('/comments', {
  name: 'comments',
  action: function () {
    this.render('Comments');
  }
});

Router.route('/newclock', {
  name: 'newclock',
  action: function () {
    this.render('Newclock');
  }
});

// Router.route('/help', {
//   name: 'help',
//   action: function () {
//     this.render('Help');
//   }
// });

Router.route('/user', {
  name: 'user',
  action: function () {
    this.render('User');
  }
});

Router.plugin('ensureSignedIn', {
    except: ['home', 'atSignIn']
});




























