const { Router } = require('express');
const router = Router();

const { login, signup, refreshToken, sendRecoverEmail, sendVerificationOtp, 
        verifyOtpCode, resetPassword} = require('@controllers/back/user_auth/user.auth.controllers');

router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/refreshToken', refreshToken);



//Codigo de Verificacion
router.post('/api/send-otp', sendVerificationOtp);
router.post('/api/verify-otp', verifyOtpCode);

router.post('/api/recover-password',sendRecoverEmail);
router.post('/api/reset-password', resetPassword);



module.exports = router;