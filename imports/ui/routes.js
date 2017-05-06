Router.route('/', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('userhome');
  }
});

Router.route('/userhome', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('userhome');
  }
});

Router.route('/templates', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('templates');
  }
});

Router.route('/emails', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('emails');
  }
});

Router.route('/recipients', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('recipients');
  }
});

Router.route('/campaigns', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('campaigns');
  }
});

Router.route('/users', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	Meteor.subscribe('allusers');
	this.render('user_list');
  }
});
