const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');

const { getList, viewcreate, create, getById, update } = require('../../../controllers/front/gender/gender.controllers')

// Countries List
router.get('/gender/list',isLoggedIn, getList);

// Countries Create
router.get('/gender/create-view',isLoggedIn, viewcreate);
router.post('/gender/create', isLoggedIn, create);

//Countries Update
router.get('/gender/:gender_id/update-view',isLoggedIn, getById);
router.post('/gender/:gender_id/update',isLoggedIn, update);


module.exports = router;