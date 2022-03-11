const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('@middlewares/auth');
const { viewIndex } = require('@controllers/front/index.controllers');


// load view index
router.get('/', isLoggedIn, viewIndex);


module.exports = router;