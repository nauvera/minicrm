import { Meteor } from 'meteor/meteor';

companyCollection = new Mongo.Collection("company");

Meteor.startup(() => {
  // code to run on server at startup
	console.log("Hello World =========>>>>>>>>>>>>>");
	process.env.MAIL_URL="smtp://postmaster%40sandbox43391c7c48a14e6da3ebb41c8dc5099b.mailgun.org:56899d4023c7a0170dcbe63f0104fcfc@smtp.mailgun.org:587";
	
	//SSR.compileTemplate("emailTemplate1", "");
	SSR.compileTemplate("emailTemplate1", Assets.getText('emailTemplate1.tmpl'));
	
	
	
	Meteor.publish("allusers",
		function () {
				return Meteor.users.find({}, {fields: {createdAt: 1, _id: 1, emails: 1}}
			);
		}
	);
	Meteor.publish("allCompanies",
		function () {
				return companyCollection.find({}, {fields: {_id: 1, email: 1, name: 1, telephone: 1, industry: 1, contact: 1, status: 1}}
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
	
	Meteor.methods({
		loadFile:	function() {
			var rows = Papa.parse(Assets.getText("data.txt")).data;
			for (var i = 1; i < rows.length; i++) {
				var company = {};
				company.name = rows[i][0];
				company.telephone = rows[i][1];
				company.email = rows[i][2];
				company.industry = rows[i][3];
				company.contact = rows[i][4];
				company.status = rows[i][5];
				var existingCompany = companyCollection.findOne({email: company.email});
				if (existingCompany) {
					console.log("Company exists: " + existingCompany._id);
					companyCollection.update(existingCompany._id, {$set: company});
				} else {
					company.createdAt = new Date();
					companyCollection.insert(company);
					console.log("Company with email: " + company.email + " is created");
				}
			}
		},
		
		sendProofEmail: function() {
			console.log("Sending proof email");
			Email.send({to:'nauvera@gmail.com', from:'admin@minicrm.com', subject:'Thank you for signing up for our project', html:SSR.render('emailTemplate1', {company:'Abbot', contact:'Nauvera Rehman', industry:'HR'}), text:'test'});
		}
	});	
});
