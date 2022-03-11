module.exports = (app) => {

    // Users Authentication 
    app.use(require('./user_auth/user.auth.routes'));

};