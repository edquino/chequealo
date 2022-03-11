const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../../../middlewares/auth');
const { adminList, createAdminView, createAdmin, updateAdminView, updateAdmin } = require('../../../controllers/front/administrators/administrators.controllers');

// List Administrators
router.get('/administrators/list', isLoggedIn, adminList);

// Create Administrators
router.get('/administrators/create', isLoggedIn, createAdminView);
router.post('/administrators/create', isLoggedIn, createAdmin);

// Update Administrators
router.get('/administrators/:admin_id/update-view', isLoggedIn, updateAdminView);
router.post('/administrators/:admin_id/update-view', isLoggedIn, updateAdmin);

//Update Administrator Active
router.get('/administrators/:admin_id/update-active');
module.exports = router;