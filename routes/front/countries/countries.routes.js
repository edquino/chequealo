const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');

const { getList, viewcreate, create, getById, update, muncipalititesByState } = require('../../../controllers/front/countries/countries.controllers')

// Countries List
router.get('/countries/list',isLoggedIn, getList);

// Countries Create
router.get('/countries/create-view',isLoggedIn, viewcreate);
router.post('/countries/create', isLoggedIn, create);

//Countries Update
router.get('/countries/:country_id/update-view',isLoggedIn, getById);
router.post('/countries/:country_id/update',isLoggedIn, update);


module.exports = router;