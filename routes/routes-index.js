module.exports = (app,passport) => {
    require('./back/back-index')(app);
    require('./front/front-index')(app,passport);
};