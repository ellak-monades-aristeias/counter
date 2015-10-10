Meteor.startup(function() {
  //user 
    if (Meteor.users.find().count() == 0 ) {

        var users = [
            {
                username: Meteor.settings.ADMIN_USERNAME,
                email: Meteor.settings.ADMIN_MAIL,
                password: Meteor.settings.ADMIN_PASS,
                firstName: Meteor.settings.ADMIN_FIRST,
                lastName: Meteor.settings.ADMIN_LAST,
                roles:['admin']
            }
        ];

        _.each(users, function (user) {
            var id = Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password,
                profile: {
                    firstName : user.firstName,
                    lastName: user.lastName
                }
            });

            if (user.roles.length > 0) {
                Roles.addUsersToRoles(id, user.roles);
            }
        });

        console.log("Seeded admin user")
    }


// geo index for search
Clocks._ensureIndex({'location.coordinates': '2dsphere'});

}); //startup


