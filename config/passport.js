const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/db');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {

        done(null, user);
    });

    passport.deserializeUser(function (user, done) {

        done(null, user);
    });

    //Login Administrator
    passport.use(
        'login-user',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
            async (req, user, password, done) => {
                db.query(
                    `SELECT * FROM chq_administrator WHERE username = $1 AND active = 1`, [user], async (err, results) => {
                    if (err) {
                        console.log(err.stack);
                        return done(null, false, req.flash('error', err.stack));
                    } else {
                        
                        if (!results.rows.length) {
                            return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                        } else {

                            if (!bcrypt.compareSync(password, results.rows[0].password)) {
                                console.log('despues entro al error');
                                return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                            } else {    

                                let user = results.rows[0];
                                return done(null, user, null);
                            }
                        }
                    }
                });
            })
    );

    //Login Administrator - Branche
    passport.use(
        'login-admin-branche',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            async (req, user, password, done) => {
                db.query(
                    `SELECT * FROM chq_manager WHERE username = $1 AND active = 1`, [user], async (err, results) => {
                    if (err) {
                        console.log(err.stack);
                        return done(null, false, req.flash('error', err.stack));
                    } else {
                        
                        if (!results.rows.length) {
                            return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                        } else {

                            if (!bcrypt.compareSync(password, results.rows[0].password)) {
                                console.log('despues entro al error');
                                return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                            } else {    

                                let user = results.rows[0];
                                return done(null, user, null);
                            }
                        }
                    }
                });
            })
    );
};
