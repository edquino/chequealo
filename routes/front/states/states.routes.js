const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('@middlewares/auth');
const { stateList, stateViewCreate, stateCreate, stateViewUpdate, stateUpdate } = require('../../../controllers/front/states/states.controllers');

/*state list */
router.get('/state/list', isLoggedIn,  stateList);

/*state create */
router.get('/state/create', isLoggedIn, stateViewCreate);
router.post('/state/create', isLoggedIn, stateCreate);

/*state update */
router.get('/state/:state_id/update', isLoggedIn, stateViewUpdate);
router.post('/state/:state_id/update', isLoggedIn, stateUpdate);

/*update active*/
router.get('/state/:state_id/active-update', isLoggedIn, stateViewUpdate);

module.exports = router;