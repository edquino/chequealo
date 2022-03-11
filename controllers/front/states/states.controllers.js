const db = require('../../../config/db');
const log = require('@lib/catch-error');

let states = {};

states.stateList = async(req, res) =>{
    try {
        await db.query('SELECT state_id, name, active FROM chq_state ORDER BY active ASC', (err, results) =>{
            if(err){
                log('src/controllers/front', 'states', 'stateList', err.stack, false, req, res);
            }else{
                let states = results.rows;
                return res.render('states/home_state', { states });
            }
        });
    } catch (error) {
        log('src/controllers/front', 'states', 'stateList', error, false, req, res);
    }
};

states.stateViewCreate = async(req, res) =>{
    try {
        res.render('states/create_state');
    } catch (error) {
        log('src/controllers/front', 'states', 'stateViewCreate', error, false, req, res);
    }
};

states.stateCreate = async(req, res) =>{

    const { name } = req.body;
    try {
       
        await db.query("INSERT INTO chq_state (name) VALUES ($1)", [name], (err, results) => {
            if(err){
                log('src/controllers/front', 'stateCreate', 'stateViewUpdate', err.stack, false, req, res);
            }else{
                req.flash('success', 'Registro creado correctamente');
                return res.redirect('/state/list');
            }
        });

    } catch (error) {
        log('src/controllers/front', 'states', 'stateCreate', error, false, req, res);
    }
};


states.stateViewUpdate = async(req, res) =>{
    const { state_id } = req.params;
    try {
        await db.query('SELECT * FROM chq_state WHERE state_id = $1', [state_id], (err, results) => {
            if(err){
                log('src/controllers/front', 'state', 'stateViewUpdate', err.stack, false, req, res);
            }else{
                let state = results.rows[0];
                return res.render('states/update_state' , {state});
            }
        })
    } catch (error) {
        req.flash('delete', error);
        log('src/controllers/front', 'states', 'stateViewUpdate', error, false, req, res);
    }
};

states.stateUpdate = async(req, res) =>{
    const { state_id } = req.params;
    const { name, active } = req.body;
    try {
        await db.query('UPDATE chq_state SET name = $1, active = $2 WHERE state_id = $3', [name, active, state_id], (err, results) => {
            if(err){
                log('src/controllers/front', 'state', 'stateUpdate', err.stack, false, req, res);
            }else{
                req.flash('warning', 'Registro Actualizado Correctamente');
                return res.redirect('/state/list');
            }
        });
    } catch (error) {
        log('src/controllers/front', 'states', 'stateUpdate', error, false, req, res);
    }
};

module.exports = states;