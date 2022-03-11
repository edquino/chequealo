const jwt = require('jsonwebtoken');
const db = require('@config/db');
const log = require('@lib/catch-error');
const ErrorModel = require('@models/errorResponse');


let usersTokenVerification = (req, res, next) => {

    let token = req.get('Authorization');
    var errorResponse = new ErrorModel({ type: "Token", title:"Falló la función", status:401, detail:"Lo sentimos ocurrió un error al validar su sesión.", instance:"token/usersTokenVerification" });

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json(errorResponse.toJson());
        }


        if(decoded.user == undefined){
            console.log(err.message);
            return res.status(401).json(errorResponse.toJson());
        }
        
        var user = decoded.user;
        db.query(`SELECT * FROM chq_users WHERE username = $1 AND active = 1`, [user.username], (err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }

            if (results.rowCount <= 0) {
                return res.status(401).json(errorResponse.toJson());
            }

            req.user = user;
            
            next();
        });


    })

};



module.exports = {
    usersTokenVerification
};
