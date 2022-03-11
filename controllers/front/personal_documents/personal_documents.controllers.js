const db = require('../../../config/db');
const log = require('../../../lib/catch-error');

const documents = {};

documents.documentsList = async(req, res) => {
    try {
        
        await db.query('SELECT document_id, name, description, active FROM chq_personal_documents', (err, results) => {
            if(err){
                log('src/controllers/front', 'personal_documents', 'documentsList', err.message, false, req, res);
            }else{
                let documents = results.rows;
                return res.render('personal_documents/per_doc_home', { documents });
            }
        });
    } catch (error) {
        log('src/controllers/front', 'personal_documents', 'documentsList', err.message, false, req, res);
    }
};

documents.viewCreatedocuments = async(req, res) =>{
    try {
        return res.render('personal_documents/per_doc_create');
    } catch (error) {
        log('src/controllers/front', 'personal_documents', 'viewCreatedocuments', error, false, req, res);
    }
};


documents.documentsCreate = async(req, res) =>{
    
    const { name, description } = req.body;
    try {

        await db.query('INSERT INTO chq_personal_documents (name, description) VALUES ($1, $2)', 
        [name, description], 
        (err, results) =>{
            if(err){
                log('src/controllers/front', 'personal_documents', 'documentsCreate', err.message, false, req, res);
            }else{
                req.flash('success', 'Registro guardado Correctamente');
                return res.redirect('/personal-documents/list');
            }
        });

    } catch (error) {
        log('src/controllers/front', 'personal_documents', 'documentsCreate', error, false, req, res);
    }
};

documents.viewUpdateDocuments = async(req, res) =>{
    const { document_id } = req.params;
    try {

        await db.query(`
        SELECT * FROM chq_personal_documents
        WHERE document_id = $1`, [document_id], (err, results) => {
            if(err){
                log('src/controllers/front', 'personal_documents', 'viewUpdateAccess', err.message, false, req, res);
            }else{
                let personal_document = results.rows[0];
                return res.render('personal_documents/per_doc_update', { personal_document });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'personal_documents', 'viewUpdateAccess', error, false, req, res);
    }
};

documents.updateDocuments = async(req, res) =>{
    const { document_id } = req.params;
    const { name, description, active } = req.body;

    try {
        await db.query(`
        UPDATE chq_personal_documents 
        SET name = $1, description = $2, active = $3 
        WHERE document_id = $4`, [name, description, active, document_id], (err, results) =>{
            if(err){
                log('src/controllers/front', 'access_Levels', 'UpdateAccess', error, false, req, res);
            }else{
                req.flash('warning', 'Registro Actualizado correctamente');
                res.redirect('/personal-documents/list');
            }
        });
    } catch (error) {
        log('src/controllers/front', 'personal_documents', 'updateAccess', error, false, req, res);
    }
};

module.exports = documents;