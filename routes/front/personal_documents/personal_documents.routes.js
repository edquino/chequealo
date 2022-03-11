const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');
const { documentsList, viewCreatedocuments, documentsCreate, viewUpdateDocuments, updateDocuments} = require('../../../controllers/front/personal_documents/personal_documents.controllers');

// List Personal Documents
router.get('/personal-documents/list', isLoggedIn, documentsList);


// Create Personal Documents
router.get('/personal-documents/create', isLoggedIn, viewCreatedocuments);
router.post('/personal-documents/create', isLoggedIn, documentsCreate);

//Update Personal Documents
router.get('/personal-documents/:document_id/update-view', isLoggedIn, viewUpdateDocuments);
router.post('/personal-documents/:document_id/update', isLoggedIn, updateDocuments);

module.exports = router;
