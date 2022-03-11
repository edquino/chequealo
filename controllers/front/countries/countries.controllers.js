const db = require('../../../config/db');
const log = require('../../../lib/catch-error');

const countries = {};


countries.getList = async (req, res) => {

    try {
        
        await db.query('SELECT country_id, name, active FROM chq_countries WHERE active = 1 ORDER BY active ASC', (err, results) =>{
            if(err){
                log('src/controllers/front', 'countries', 'stateList', err.stack, false, req, res);
            }else{
                let countries = results.rows;
                return res.render('countries/country_home', { countries });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'countries', 'getList', error, false, req, res);
    }

};

countries.viewcreate = async(req, res)=>{

    try {
        
        return res.render('countries/country_create')
        
    } catch (error) {
        log('src/controllers/front', 'countries', 'viewcreate', error, false, req, res);
    }

};

countries.create = async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {

        await db.query('INSERT INTO chq_countries (name) VALUES ($1)', [name], (err, results) => {
            if (err) {
                log('src/controllers/front', 'countries', 'create', err.stack, false, req, res);
                req.flash('delete', err.message);
                return res.redirect('/municipalities/list');
            } else {
                req.flash('success', 'Registro guardado correctamente');
                return res.redirect(`/countries/list`);
            }
        });

    } catch (error) {
        log('src/controllers/front', 'countries', 'create', error, false, req, res);
        req.flash('delete', error);
    }
};

countries.getById = async (req, res) => {
    
    const { country_id } = req.params;

    try {
            
        await db.query(
        `SELECT country_id, name, active FROM chq_countries WHERE country_id = $1`, 
        [country_id], (err, results) => {
            if (err) {
                req.flash('error',err.message);
                log('src/controllers/front', 'countries', 'getById', err, false, req, res);
            }else{
                var country = results.rows[0];
                return res.render('countries/country_update',{ country });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'countries', 'getById', error, false, req, res);
    }
};

countries.update = async (req, res) => {

    const { country_id } = req.params;
    const { name, active } = req.body;

    try {
        
        await db.query('UPDATE chq_countries SET name = $1, active = $2 WHERE country_id = $3', [name, active, country_id], (err, results) => {
            if (err) {
                log('src/controllers/front', 'countries', 'update', err.message, false, req, res);
                return res.redirect(`/states/${municipality_id}/municipalities-list`);
            }else{
                req.flash('warning', 'registro Actualizado correctamente')
                return res.redirect(`/countries/list`);
            }    
        });   

    } catch (error) {
        log('src/controllers/front', 'municipality', 'update', error, false, req, res);
    }
};


module.exports = countries;