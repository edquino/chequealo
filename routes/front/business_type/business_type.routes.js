const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');
const { getList, viewCreate, create, viewUpdate, update} = require('../../../controllers/front/business_type/business_type.controllers');

// List Personal Documents
router.get('/business_type/list', isLoggedIn, getList);


// Create Personal Documents
router.get('/business_type/create', isLoggedIn, viewCreate);
router.post('/business_type/create', isLoggedIn, create);

//Update Personal Documents
router.get('/business_type/:business_type_id/update-view', isLoggedIn, viewUpdate);
router.post('/business_type/:business_type_id/update', isLoggedIn, update);

module.exports = router;
