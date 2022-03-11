const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');
const { accessList, viewCreateAccess, accessCreate, viewUpdateAccess, UpdateAccess } = require('../../../controllers/front/access_levels/access_levels.controllers');

// List Access Levels
router.get('/access-level/list', isLoggedIn, accessList);

// Create Access Levels
router.get('/access-level/create', isLoggedIn, viewCreateAccess);
router.post('/access-level/create', isLoggedIn, accessCreate);

//Update Access Levels
router.get('/access-level/:access_level_id/update', isLoggedIn, viewUpdateAccess);
router.post('/access-level/:access_level_id/update', isLoggedIn, UpdateAccess);

module.exports = router;
