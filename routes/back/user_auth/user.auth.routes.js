const { Router } = require('express');
const router = Router();
const upload = require('../../../lib/multer');

const { login, signup, refreshToken, sendRecoverEmail, getUser, sendVerificationOtp, 
        verifyOtpCode, resetPassword, getFormVersion, frontPhoto, backPhoto, userPhoto, profile} = require('@controllers/back/user_auth/user.auth.controllers');
const { usersTokenVerification } = require('@middlewares/token.middleware');


router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/refreshToken', refreshToken);

// router.get('/api/profile', usersTokenVerification, profile);
router.get('/api/user/:user_id', usersTokenVerification, getUser);

//Codigo de Verificacion
router.post('/api/send-otp', sendVerificationOtp);
router.post('/api/verify-otp', verifyOtpCode);

router.post('/api/recover-password',sendRecoverEmail);
router.post('/api/reset-password', resetPassword);

//Version
router.get('/api/app/info/version', getFormVersion);

//Profile
router.put('/api/user/:user_id/profile', profile);

//Update Document-Photo
router.put('/api/user/:user_id/update-front-photo', upload.single('file'), frontPhoto);
router.put('/api/user/:user_id/update-back-photo', upload.single('file'), backPhoto);

router.put('/api/user/:user_id/profile-photo', upload.single('file'), userPhoto);


module.exports = router;