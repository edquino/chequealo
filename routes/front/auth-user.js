const db = require('@config/db');
const { isNotLoggedIn, isLoggedIn } = require('@middlewares/auth');


module.exports = function (app, passport) {

    // view-authenticate
    app.get('/Authenticate', isNotLoggedIn, async (req, res) => {
        res.render('auth-user/login');
    });

    //Authenticate
    app.post('/Authenticate', isNotLoggedIn, passport.authenticate('login-user', {
        successRedirect: '/',
        failureRedirect: '/Authenticate',
        failureFlash: true
    }));

    //session close 
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/Authenticate-admin-branche');
    });

};