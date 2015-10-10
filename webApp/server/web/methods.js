Meteor.methods({

	'counters.insert': function(opts) {
		var role = opts.roles[0];
		var mail = opts.emails[0].address;
		var pass = Meteor.settings.DEFAULT_COUNTER_PASS;

		var id = Accounts.createUser({
			username: opts.username,
			email: mail,
			password: pass,
            profile: {
                firstName : opts.profile.firstName,
                lastName: opts.profile.lastName
            }			
		});

		if (opts.roles.length > 0) {
			Roles.addUsersToRoles(id, role);
		};

	},

	'paths.addClock': function (pathId, clockId) {
		check(pathId, String);
		check(clockId, String);
		var loggedInUser = Meteor.user();
		if (!loggedInUser) {
			throw new Meteor.Error("not-logged-in", "You must be logged in for this action!");
		} else { 
			Paths.update(pathId, { $addToSet: {
		 		clocks: clockId
			}});
		}
	},
	
	'paths.removeClock': function (pathId, clockId) {
		check(pathId, String);
		check(clockId, String);
		var loggedInUser = Meteor.user();
		if (!loggedInUser) {
			throw new Meteor.Error("not-logged-in", "You must be logged in for this action!");
		} else { 
			Paths.update(pathId, { $pull: { clocks: clockId }});
		}
	}

});




