const db = require('@config/db');
const log = require('@lib/catch-error');

let viewIndex = async(req, res) => {
    
    try {          
        var year = new Date().getFullYear();
        return res.render('home/home',{user: req.user, year});

    } catch (error) {
        log('src/controllers/front', 'index', 'viewIndex', error, false, req, res);
    }

};

module.exports = {
    viewIndex
}