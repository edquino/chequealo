const db = require('../../../config/db');
const log = require('../../../lib/catch-error');

const businessType = {};

businessType.getList = async(req, res) => {
    try {
        
        await db.query('SELECT business_type_id, name, description, active FROM chq_business_type', (err, results) => {
            if(err){
                log('src/controllers/front', 'business_type', 'getList', err.message, false, req, res);
            }else{
                let businessTypes = results.rows;
                return res.render('business_type/bus_type_home', { businessTypes });
            }
        });
    } catch (error) {
        log('src/controllers/front', 'business_type', 'getList', err.message, false, req, res);
    }
};

businessType.viewCreate = async(req, res) =>{
    try {
        return res.render('business_type/bus_type_create');
    } catch (error) {
        log('src/controllers/front', 'business_type', 'viewCreate', error, false, req, res);
    }
};


businessType.create = async(req, res) =>{
    
    const { name, description } = req.body;

    try {

        await db.query('INSERT INTO chq_business_type (name, description) VALUES ($1, $2)', 
        [name, description], 
        (err, results) =>{
            if(err){
                log('src/controllers/front', 'business_type', 'create', err.message, false, req, res);
            }else{
                req.flash('success', 'Registro guardado Correctamente');
                return res.redirect('/business_type/list');
            }
        });

    } catch (error) {
        log('src/controllers/front', 'business_type', 'create', error, false, req, res);
    }
};

businessType.viewUpdate = async(req, res) =>{
    const { business_type_id } = req.params;
    try {

        await db.query(`
        SELECT * FROM chq_business_type
        WHERE business_type_id = $1`, [business_type_id], (err, results) => {
            if(err){
                log('src/controllers/front', 'business_type', 'viewUpdate', err.message, false, req, res);
            }else{
                let businessType = results.rows[0];
                return res.render('business_type/bus_type_update', { businessType });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'business_type', 'viewUpdate', error, false, req, res);
    }
};

businessType.update = async(req, res) =>{
    const { business_type_id } = req.params;
    const { name, description, active } = req.body;

    try {
        await db.query(`
        UPDATE chq_business_type 
        SET name = $1, description = $2, active = $3 
        WHERE business_type_id = $4`, [name, description, active, business_type_id], (err, results) =>{
            if(err){
                log('src/controllers/front', 'business_type', 'update', error, false, req, res);
            }else{
                req.flash('warning', 'Registro Actualizado correctamente');
                res.redirect('/business_type/list');
            }
        });
    } catch (error) {
        log('src/controllers/front', 'business_type', 'update', error, false, req, res);
    }
};

module.exports = businessType;