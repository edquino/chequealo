const { Router } = require('express');
const router = Router();
const upload = require('../../../lib/multer');

const { version, data, update,  userPhoto, frontPhoto, backPhoto, sendValidationEmail, validateCode, changeEmail } = require('@controllers/back/users/profile');
const { usersTokenVerification } = require('@middlewares/token.middleware');


//Profile
router.get('/api/profile/version', usersTokenVerification, version);
router.get('/api/profile', usersTokenVerification, data);
router.put('/api/profile', usersTokenVerification, update);

//Update Document-Photo
router.put('/api/profile/images/document/front', usersTokenVerification, upload.single('image'), frontPhoto);
router.put('/api/profile/images/document/back', usersTokenVerification, upload.single('image'), backPhoto);
router.put('/api/profile/images/profile', usersTokenVerification, upload.single('image'), userPhoto);

router.post('/api/profile/email/verify', usersTokenVerification, sendValidationEmail);
router.post('/api/profile/email/validate', usersTokenVerification, validateCode);
router.put('/api/profile/email', usersTokenVerification, changeEmail);



module.exports = router;