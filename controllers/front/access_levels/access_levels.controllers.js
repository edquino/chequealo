const db = require('../../../config/db');
const log = require('../../../lib/catch-error');

const accessLevels = {};

accessLevels.accessList = async(req, res) => {
    try {
        
        await db.query('SELECT access_level_id, access_name, description, active FROM chq_access_levels', (err, results) => {
            if(err){
                log('src/controllers/front', 'access_Levels', 'accessList', err.message, false, req, res);
            }else{
                let accessLevels = results.rows;
                return res.render('access_leves/acc_levels_home', { accessLevels });
            }
        });
    } catch (error) {
        log('src/controllers/front', 'access_Levels', 'accessList', err.message, false, req, res);
    }
};

accessLevels.viewCreateAccess = async(req, res) =>{
    try {
        return res.render('access_leves/acc_levels_create');
    } catch (error) {
        log('src/controllers/front', 'access_Levels', 'viewCreateAccess', error, false, req, res);
    }
};


accessLevels.accessCreate = async(req, res) =>{
    
    const { access_name, description } = req.body;

    try {

        await db.query('INSERT INTO chq_access_levels (access_name, description) VALUES ($1, $2)', [access_name, description], (err, results) =>{
            if(err){
                log('src/controllers/front', 'access_Levels', 'accessCreate', err.message, false, req, res);
            }else{
                req.flash('success', 'Registro guardado Correctamente');
                return res.redirect('/access-level/list');
            }
        });

    } catch (error) {
        log('src/controllers/front', 'access_Levels', 'accessCreate', error, false, req, res);
    }
};

accessLevels.viewUpdateAccess = async(req, res) =>{
    const { access_level_id } = req.params;
    try {

        await db.query(`
        SELECT access_level_id, access_name, description, active 
        FROM chq_access_levels 
        WHERE access_level_id = $1`, [access_level_id], (err, results) => {
            if(err){
                log('src/controllers/front', 'access_Levels', 'viewUpdateAccess', err.message, false, req, res);
            }else{
                let accessLevel = results.rows[0];
                return res.render('access_leves/acc_levels_update', { accessLevel });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'access_Levels', 'viewUpdateAccess', error, false, req, res);
    }
};

accessLevels.UpdateAccess = async(req, res) =>{
    const { access_level_id } = req.params;
    const { access_name, description, active } = req.body;

    try {
        await db.query(`
        UPDATE chq_access_levels 
        SET access_name = $1, description = $2, active = $3 
        WHERE access_level_id = $4`, [access_name, description, active, access_level_id], (err, results) =>{
            if(err){
                log('src/controllers/front', 'access_Levels', 'UpdateAccess', error, false, req, res);
            }else{
                req.flash('warning', 'Registro Actualizado correctamente');
                res.redirect('/access-level/list');
            }
        });
    } catch (error) {
        log('src/controllers/front', 'access_Levels', 'UpdateAccess', error, false, req, res);
    }
};

module.exports = accessLevels;