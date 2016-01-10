var User = require("../models/user");
var Application = require("../models/application");
var db = require("secondthought");
var assert = require('assert');



var RegResult = function(){
    var result = {
        success : false,
        message : null,
        user : null
    };

    return result;
};

var Registration = function(db){
    var self = this;
    var validateInputs = function(app){
        //make sure there's an email and psw
        if (!app.email || !app.password) {
            app.setInvalid("Email and password are required");
        } else if(app.password !== app.confirm) {
            app.setInvalid("Passwords don't match");
        } else {
            app.validate();
        }
    };

    var checkIfUserExists = function(app, next){
        db.users.exists({email : app.email}, next);
    };

    self.applyForMembership = function(args, next){
        var regResult = new RegResult();
        var app = new Application(args);

        //validate inputs
        //validate password and email
        validateInputs(app);

        //check t see if email exist
        checkIfUserExists(app, function(err, exists){
           assert.ok(err === null, err);
            if (!exists) {
                //create a new user
                //hash the password
                //create a log entry
                regResult.success = true;
                regResult.message = "Welcome!";

                regResult.user = new User(args);
            }
            next(null, regResult);
        });
    };
    return self;
};

module.exports = Registration;
