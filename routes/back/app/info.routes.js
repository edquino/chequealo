const { Router } = require('express');
const router = Router();


router.get('/api/app/version', (req,res) => {
    return res.status(200).json({ version : 0.1});
});

module.exports = router;