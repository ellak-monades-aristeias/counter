Meteor.methods({

	'counters.insert': function(opts) {

		var mail = opts.emails[0].address;

		var pass = '123456b:'

		var id = Accounts.createUser({
			username: opts.username,
			email: mail,
			password: pass
		});

		if (opts.roles.length > 0) {
			Roles.addUsersToRoles(id, opts.roles);
		};

	}










});