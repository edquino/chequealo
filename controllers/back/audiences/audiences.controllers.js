const db = require('@config/db');
const log = require('@lib/catch-error');
const ErrorModel = require('@models/errorResponse');

const audience = {};

audience.getlist = async(req, res) => {
    const { audience_id, user_id, branche_id, audience_date, audience_hour, parking , type, description, visitors } = req.body;
    
    try {
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:400, detail:"Revise su información, todos los campos son obligatorios.", instance:"auth/signup" });

    } catch (error) {
        log('src/controllers/back', 'user.auth', 'signup', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

module.exports = audience;
