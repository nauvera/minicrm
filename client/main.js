import "../imports/ui/routes.js"

/*Accounts.createUser({
	email: "admin@minicrm.com",
	password: "111111"
});*/
companyCollection = new Mongo.Collection("company");


Template.home.events({
    'submit .login': function(event){
		event.preventDefault();
        var email = $('[type=email]').val();
        var password = $('[type=password]').val();
        Meteor.loginWithPassword(email, password, function(error) {
			if (!error) {
				Router.go(userhome);
			}
		});
    }
});

Template.menu.events({
	'click .logout': function(event) {
		event.preventDefault();
		Meteor.logout();
	}
});

Template.user_list.helpers({
  allUsers: function () {
	var rawUsers = Meteor.users.find({}).fetch();
	var users = [];
	_.each(rawUsers, function(user) {
		user.primaryEmail = user.emails[0].address;
		//user.dontDelete = user.emails[0].address !== 'admin@minicrm.com' && user._id !== Meteor.userId();
		user.dontDelete = user.emails[0].address !== 'admin@minicrm.com';
		//user.dontDelete = true;
		users.push(user);
	})
	return users;    
  }
});

Template.user_list.events({
	'submit .register': function(event) {
		event.preventDefault();
        var user = {};
		user.email = $('[name=emailN]').val();
        user.password = $('[name=passwordN]').val();
		Accounts.createUser(user, function(error) {
			if (!error) {
				alert("User created successfully");
				Router.go("users");
			} else {
				alert(error);
			}
		});
	}
});



Template.user_item.events({
	'click .deleteUser': function(event) {
		//alert("Delete User " + this._id );
		event.preventDefault();
		Meteor.users.remove({ _id: this._id }, function (error, result) {
			if (error) {
				alert("Error removing user: " + error + " -- " + result);
			} else {
				alert("Number of users removed: " + result);
			}
		});
	}
});


Template.menu.helpers({
	loggedInUserName: function() {
		return Meteor.user().emails[0].address;
	}
});

Template.companies.onCreated(function() {
	$('#example').tablesorter();
});


Template.userhome.events({
	'click .readFromFile': function(event) {
		event.preventDefault();
		Meteor.call("loadFile", function(error, result) {
			if (error) {
				alert(error);
			} else {
				alert("File loaded successfully");
			}
		});
	},
	'click .deleteCompanies': function(event) {
		event.preventDefault();
		if ($("input:checked.companyChBx").length > 0) {
			if (confirm("Are you sure to delete " + $("input:checked.companyChBx").length + " compan(y)(ies)?") === true) {
				$.each($("input:checked.companyChBx"), function(i, cb) {
					var companyId = $(this).attr("companyId");
					if (companyId) {
						companyCollection.remove(companyId);
					}
				});
			}
			$(".companyChBxAll").prop("checked", false);
		}
	},
	'click .companyChBxAll': function(e) {
		if ($(e.target).is(":checked")) {
			$(".companyChBx").prop("checked", true);
		} else {
			$(".companyChBx").prop("checked", false);
		}
	}
});

Template.companies.helpers({
	allCompanies: function() {
		var handle = Meteor.subscribe('allCompanies');
		var companies = [];
		if (handle.ready()) {
			var rawCompanies = companyCollection.find({}, {sort: {name: 1}}).fetch();
			_.each(rawCompanies, function(company) {
				companies.push(company);
			});
		}
		return companies;
	}
});

Template.sendOuts.events({
	'click .sendProof': function() {
		Meteor.call("sendProofEmail", function(error, result) {
			if (error) {
				alert(error);
			} else {
				alert("Proof email sent");
			}
		});
	}
});