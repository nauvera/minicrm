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

Router.route('/createLists', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('createLists');
  }
});

Router.route('/addNewCompany', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('addNewCompany');
  }
});

Router.route('/sendOuts', function () {
  if (!Meteor.userId()) {
	this.render('home');
  } else {
	this.render('sendOuts');
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
