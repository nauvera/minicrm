import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish("allusers",
		function () {
				return Meteor.users.find({}, {fields: {createdAt: 1, _id: 1, emails: 1}}
			);
		}
	);
	Meteor.users.allow({
		remove: function(userId, doc) {
			// JUST FOR TESTING - NEVER DO THIS IN PRODUCTION
			return true;
		}
	});
	
	if(!Meteor.users.find().count()) {
		var options = {
			password: '111111', 
			email: 'admin@minicrm.com'
		};
		Accounts.createUser(options);
	}
});
