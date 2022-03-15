const db = require('@config/db');
const { isNotLoggedIn, isLoggedIn } = require('@middlewares/auth');


module.exports = function (app, passport) {

    // view-authenticate - Administrator - Branche
    app.get('/Authenticate-admin-branche', isNotLoggedIn, async (req, res) => {
        res.render('auth-admin-branche/login');
    });

    //Authenticate - - Administrator - Branche
    app.post('/Authenticate-admin-branche', isNotLoggedIn, passport.authenticate('login-admin-branche', {
        successRedirect: '/',
        failureRedirect: '/Authenticate-admin-branche',
        failureFlash: true
    }));

    // view-authenticate - Admnistrator - Chequealo
    app.get('/Authenticate', isNotLoggedIn, async (req, res) => {
        res.render('auth-admin/login');
    });

    //Authenticate - Administrator - Chequealo
    app.post('/Authenticate', isNotLoggedIn, passport.authenticate('login-admin-chq', {
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