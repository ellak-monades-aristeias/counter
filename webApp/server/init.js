Meteor.startup(function() {
  //user 
  if (Meteor.users.find().count() == 0 ) {

     var users = [
         {email: Meteor.settings.ADMIN_MAIL, password: Meteor.settings.ADMIN_PASS, roles:['admin']}
     ];

     _.each(users, function (user) {
         var id = Accounts.createUser({
             email: user.email,
             password: user.password,
         });

         if (user.roles.length > 0) {
             Roles.addUsersToRoles(id, user.roles);
         }
     });

     console.log("Seeded admins")
  }




}); //startup
