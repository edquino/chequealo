module.exports = (app) => {

    // Users Authentication 
    app.use(require('./user_auth/user.auth.routes'));
    app.use(require('./user_auth/user.profile.routes'));

    app.use(require('./app/info.routes'));


};