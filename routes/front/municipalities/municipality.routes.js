const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');

const { getList, viewcreate, create, getById, update, muncipalititesByState } = require('../../../controllers/front/municipalities/municipality.controller')

// Municipalities List
router.get('/municipalities/list',isLoggedIn, getList);

// See Municipalities by State
router.get('/states/:state_id/municipalities-list',isLoggedIn, muncipalititesByState);

// Municipalities Create
router.get('/state/:state_id/municipalities/create-view',isLoggedIn, viewcreate);
router.post('/municipalities/create', isLoggedIn, create);

//Municipalities Update
router.get('/municipalities/:municipality_id/update-view',isLoggedIn, getById);
router.post('/municipalities/:municipality_id/update',isLoggedIn, update);

// State Update
router.get('/states/:state_id/municipalities-list',isLoggedIn, muncipalititesByState);


module.exports = router;