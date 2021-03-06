// /routes/route_account.js

var register = require('../app/register.js');

module.exports = function(config, app, passport) {
    //Account registration form
    app.get('/account/register', function(req, res) {
        if(req.query.error) {
            req.flash("registerError", "An account with that email already exists.");
        } else if(req.query.success) {
            req.flash("registerSuccess", "You have successfuly registered. You may now log in.");
        }
        res.render('./account/register.ejs', {
            title : config.title,
            registerError : req.flash("registerError"),
            registerSuccess : req.flash("registerSuccess"),
            loggedIn: req.isAuthenticated()
        });
    });

    //Process account registration form
    app.post('/account/register', register, function(req, res) {
        //If it makes it here then registration was successful so redirect to get the get version
        //with the param of success 
        res.redirect('/account/register?success=true');
    });

    //Login form
    app.get("/account/login", function(req, res) {
        //Send the loginf orm
        res.render('./account/login.ejs', {
            title : config.title,
            loggedIn: req.isAuthenticated(),
            message: req.flash("loginMessage")
        });
    });

    //Process login form
    app.post("/account/login", passport.authenticate('local', {
        successRedirect : "/",
        failureRedirect : "/account/login",
        failureFlash : true
    }));

    //Logout
    app.get("/account/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    })
}