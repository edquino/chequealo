const db = require('@config/db');
const log = require('@lib/catch-error');

const ErrorModel = require('@models/errorResponse');

const ProfileModel = require('../../../models/profile/profile_model');


const moment = require('moment');
const sendemail = require('@lib/emails');

const profile = {};

profile.version = async  (req,res) => {
    try {
        
        var errorResponse = new ErrorModel({ type: "Profile", title:"Falló la función", status:500, detail:"Error al obtener la version del perfil.", instance:"profile/version" });
        
        await db.query(`SELECT version FROM chq_users WHERE user_id = $1`,
        [req.user.user_id], (err, results) => {
            if (err) {
                console.log(err.message);
                errorResponse.detail = err.message;
                return res.status(500).json(errorResponse.toJson());
            }else{
                
            var version = results.rows[0].version; 
            
            return res.status(200).json({version});
            }
        });
    } catch (error) {
        log('src/controllers/back', 'profile.version', 'profile', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());

    }
}

profile.data = async (req, res) =>{

    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:401, detail:"Ocurrió un error al intentar obtener el usuario.", instance:"user.auth/getUser" });

    try {

        await db.query(`SELECT * FROM chq_users WHERE user_id = $1`, [req.user.user_id], (err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                
                let user = results.rows[0];
                let profile = new ProfileModel({ user });

                return res.status(200).json(profile.toJson());
            }
        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'getUser', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

profile.update = async (req, res) => {
    const { general_data, contact_data, personal_data } = req.body;
   
    try {
        
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:400, detail:"Revise su información, todos los campos son obligatorios.", instance:"auth/profile" });
        
        await db.query(`UPDATE chq_users SET name = $1, lastname = $2, gender_id = $3, 
        workplace = $4, workload = $5, workphone = $6, twitter = $7, facebook = $8, address = $9, 
        document_detail = $10, document_photo1 = $11, document_photo2 = $12, version = CURRENT_TIMESTAMP WHERE user_id = $13 RETURNING*`,
        [ general_data.name, general_data.last_name, general_data.gender_id,
             contact_data.work_place, contact_data.job_position, contact_data.work_phone, contact_data.twitter, 
            contact_data.facebook, personal_data.address, personal_data.document_detail,personal_data.document_front_pic,personal_data.document_back_pic, req.user.user_id], (err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                
            var user = results.rows[0]; 
            
            return res.status(200).json({
                version: user.version,
                general_data: {
                    "user_id": user.user_id,
                    "user_name": user.username,
                    "name": user.name,
                    "last_name": user.lastname,
                    "email": user.email,
                    "gender_id": user.gender_id,
                    "phone": user.cellphone,
                    "profile_picture" : user.picture
                },
                contact_data: {
                    "work_place": user.workplace,
                    "job_position": user.workload,
                    "work_phone": user.workphone,
                    "twitter": user.twitter,
                    "facebook": user.facebook
                },
                personal_data: {
                    "address": user.address,
                    "document_detail": user.document_detail,
                    "document_front_pic": user.document_photo1,
                    "document_back_pic": user.document_photo2
                }
        });
            }
        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'profile', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());

    }


};

profile.userPhoto = async (req, res) => {

    try {
       
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar la fotografía.", instance:"auth/userPhoto" });
        let photo_path;

        if (req.file.filename === "") {
            errorResponse.detail = "Ninguna fotografía seleccionada";
            return res.status(404).json(errorResponse.toJson());
        }else{
            photo_path = 'uploads/' + req.file.filename;
        }

      


        await db.query('UPDATE chq_users SET picture = $1, version = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING*', [photo_path, req.user.user_id],  (err, results) => {
            if(err){
                errorResponse.detail = err.message;
                log('src/controllers/back', 'user.auth', 'userPhoto', err.message, true, req, res);
                return res.status(500).json(errorResponse.toJson());
            }

            let userPhoto = results.rows[0];
              
            return res.status(200).json({
                path: userPhoto.picture
            });
        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'userPhoto', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }

};

profile.frontPhoto = async (req, res) => {


    try {
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar la fotografía.", instance:"auth/frontPhoto" });
        let photo_path;

        if (req.file.filename === "") {
            errorResponse.detail = "Ninguna fotografía seleccionada";
            return res.status(400).json(errorResponse.toJson());
        }else{
            photo_path = 'uploads/' + req.file.filename;
            return res.status(200).json({
                path: photo_path
            });
        }

        
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'frontPhoto', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

profile.backPhoto = async (req, res) => {

    try {
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar la fotografía.", instance:"auth/backPhoto" });
        let photo_path;

        if (req.file.filename === "") {
            errorResponse.detail = "Ninguna fotografía seleccionada";
            return res.status(400).json(errorResponse.toJson());
        }else{
            photo_path = 'uploads/' + req.file.filename;
            return res.status(200).json({
                path: photo_path
            });
        }

    } catch (error) {
        log('src/controllers/back', 'user.auth', 'backPhoto', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

profile.sendValidationEmail = async (req,res) => {
    const { email } = req.body;
    var code;

    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar enviar el correo con su codigo de recuperación, por favor intentelo de nuevo.", instance:"auth/sendRecoverEmail" });

    try {



        var expiration_date = moment().add(1, 'hours').format("YYYY-MM-DD HH:mm:ss");

        var randomnumber1 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber2 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber3 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber4 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber5 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber6 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber7 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber8 = Math.floor(Math.random() * (9 - 0)) + 0;

        code = randomnumber1.toString() + "" + randomnumber2.toString() + "" + randomnumber3.toString() + "" + randomnumber4.toString() + "" + randomnumber5.toString() + "" + randomnumber6.toString() + "" + randomnumber7.toString() + "" + randomnumber8.toString();
        
        

        await db.query('SELECT * FROM chq_users WHERE email = $1', [email], async(err, results) => {
            if(err){
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                let user = results.rowCount;
                if(user <= 0){
                    await db.query('UPDATE chq_recover_codes SET active = 0 WHERE email = $1', [email]);
                    await db.query('INSERT INTO chq_recover_codes (user_id,email, code, expiration_date) VALUES ($1, $2, $3,$4)', [req.user.user_id,email, code, expiration_date], (err, results) => {
                        if (err) {
                            console.log(err.message);
                            return res.status(500).json(errorResponse.toJson());
                        }
            
                        //--- Envio de correo electronico
                        sendemail('"SOPORTE CHEQUEALO" <correo@nextdeployed.com>', email, 'Cambio de correo electronico', `Copie el siguiente código: ${ code }`).then((result) => {
                            //console.log(result);
                        }, function (error) {
                            console.log(error.stack);
                        });
            
                        return res.status(200).json({
                            message:"Correo Enviado",
                            email,
                            code
                        });
            
                    });
                }else{
                    //404: not found / no encontrado
                    errorResponse.detail = 'Correo electrónico registrado';
                    return res.status(401).json(errorResponse.toJson());
                }
            }
        });
        
    } catch (error) {
        log('src/controllers/back', 'users.profile', 'sendValidationEmail', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

profile.validateCode = async(req, res) =>{
    const { code  } = req.body;
    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Ocurrió un error al intentar verificar la cuenta.", instance:"user.profile/validateCode" });

    let user_id = req.user.user_id;

    try {
        
        await db.query(`SELECT * FROM chq_users WHERE user_id = $1 AND active = 1`, 
        [user_id], async(err, results) => {
            if(err){
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{              
                
                if (results.rowCount > 0) {

                    
                    
                    let user = results.rows[0];

                    
                    await db.query(`SELECT * FROM chq_recover_codes WHERE user_id = $1 AND code = $2 AND active = 1`, [user.user_id, code], (err, results) =>{
                        if(err){
                            console.log(err.message);
                            return res.status(500).json(errorResponse.toJson());
                        }else{
                            let userCode = results.rows[0]
                            
                            if(userCode != undefined){
                        
                                    let dateCurrent = new Date();
                                    let formatCurrentDate  = moment(dateCurrent).format('YYYY-MM-DD hh:mm:ss');
                                    
                                    let isafter = moment(userCode.expiration_date).isAfter(formatCurrentDate);
                                    
                                    if (isafter) {
                                        
                                        db.query('UPDATE chq_recover_codes SET active = 0 WHERE email = $1', [user.email]);
                                        return res.status(200).json({
                                            version: user.version,
                                            general_data: {
                                                "user_id": user.user_id,
                                                "user_name": user.username,
                                                "email": user.email
                                            },
                                            contact_data: {},
                                            personal_data: {}
                                        });
        
                                    }else {
                                        errorResponse.detail = "El código ingresado ya ha expirado";
                                        return res.status(400).json(errorResponse.toJson());
                                    }
        
                            }else{
                                errorResponse.detail = "El código ingresado no existe";
                                return res.status(404).json(errorResponse.toJson());
                            }
                        }
                    });
                                        
                }else {
                    return res.status(401).json(errorResponse.toJson());
                }
                
            }
        });

    } catch (error) {
        log('src/controllers/back', 'user.auth', 'verifyOtpCode', error, true, req, res);
        return res.status(500).json(errorResponse.toJson()); 
    }
};

profile.changeEmail = async (req, res) => {
    
    var errorResponse = new ErrorModel({ type: "Profile", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar su correo.", instance:"profile/changeEmail" });

    try {
        
        
        await db.query('SELECT * FROM chq_recover_codes WHERE user_id = $1 AND active = 1', [req.user.user_id], async(err, results) => {
            if (err) {
                console.log(err.message);
                errorResponse.detail = err.message;
                return res.status(500).json(errorResponse.toJson());
            }else{
                
                let userData = results.rows[0];
                    
                if(userData != undefined){
                    
                    let dateCurrent = new Date();
                    let formatCurrentDate  = moment(dateCurrent).format('YYYY-MM-DD hh:mm:ss');
                    
                    let isafter = moment(userData.expiration_date).isAfter(formatCurrentDate);
                    
                    if(isafter){
                                            
                        await db.query('UPDATE chq_users SET email = $1 WHERE user_id = $2 AND active = 1 RETURNING*', [ userData.email, req.user.user_id], (err, results) =>{
                            if(err){
                                console.log(err.message);
                                errorResponse.detail = err.message;
                                return res.status(500).json(errorResponse.toJson());
                            }else{
                                
                                let emailUpdated = results.rowCount;        

                                if(emailUpdated > 0){
                                    
                                    db.query('UPDATE chq_recover_codes SET active = 0 WHERE user_id = $1', [req.user.user_id]);   
                                    return res.status(200).json({
                                        message: "Correo actualizado correctamente."
                                    });
                                    
                                }else{
                                    errorResponse.detail = "Lo sentimos currió un error al intentar actualizar su correo";
                                    return res.status(500).json(errorResponse.toJson());
                                }
                            }
                        });

                    }else{
                        errorResponse.detail = "El código de verificación ya expiró";
                        return res.status(400).json(errorResponse.toJson()); 
                    }

                }else{
                    errorResponse.detail = "Codigo invalido.";
                    return res.status(401).json(errorResponse.toJson());
                }

            }

        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'resetPassword', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }

};

module.exports = profile;