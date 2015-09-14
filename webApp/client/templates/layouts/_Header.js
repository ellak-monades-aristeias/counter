Template._Header.events({
   'click [data-action="logout"]' : function(evt,tmpl) {
  	evt.preventDefault();
    AccountsTemplates.logout();
    console.log('bitch!')
  }
});