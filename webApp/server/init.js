Meteor.startup(function() {
  //user 
    if (Meteor.users.find().count() == 0 ) {

        var users = [
            {username: "admin user", email: Meteor.settings.ADMIN_MAIL, password: Meteor.settings.ADMIN_PASS, roles:['admin']}
        ];

        _.each(users, function (user) {
            var id = Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password
            });

            if (user.roles.length > 0) {
                Roles.addUsersToRoles(id, user.roles);
            }
        });

        console.log("Seeded admin user")
    }


}); //startup

Clocks._ensureIndex({'location.coordinates': '2dsphere'});
