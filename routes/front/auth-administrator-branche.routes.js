const { isNotLoggedIn, isLoggedIn } = require('@middlewares/auth');

module.exports = function (app, passport) {

    // view-authenticate
    app.get('/Authenticate-admin-branche', isNotLoggedIn, async (req, res) => {
        res.render('auth-admi-branche/login');
    });

    //Authenticate
    app.post('/Authenticate-admin-branche', isNotLoggedIn, passport.authenticate('login-admin-branche', {
        successRedirect: '/',
        failureRedirect: '/Authenticate-admin-branche',
        failureFlash: true
    }));

    //session close 
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/Authenticate-admin-branche');
    });

};