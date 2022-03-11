
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const port = process.env.PORT || 4000;


const app = express();

const cors = require('cors');


const dotenv = require('dotenv').config();


require('module-alias/register');

app.use(cors());
app.use(cookieParser());


app.use(session({
    secret: '6K0+n5SpkCAjVAJ9DIeJNEPsKOZ71vsRLoRSleQM',
    cookie: {
        maxAge: 6000000
    },
    saveUninitialized: true,
    resave: false
}));


app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.success = req.flash('success');
    app.locals.warning = req.flash('warning');
    app.locals.delete = req.flash('delete');
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes-index')(app, passport);

app.all('*', (req, res) =>{
    return res.render('errors-pages/error-404');
})


app.listen(port, () => {
    console.log('chequealo app is running on port ' + port);

});
