const db = require('@config/db');
const log = require('@lib/catch-error');
const ErrorModel = require('@models/errorResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const sendemail = require('@lib/emails');


const user = {};

user.getFormVersion = (req,res) => {

    let version = parseFloat("0.1");
  
    return res.status(200).json({version});
}

user.profile = async (req, res) => {
    const { user_id } = req.params;
    const { version, general_data, contact_data, personal_data } = req.body;
    console.log(general_data);
    console.log(contact_data);
    console.log(personal_data);
    try {
        
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:400, detail:"Revise su información, todos los campos son obligatorios.", instance:"auth/profile" });
        
        await db.query(`UPDATE chq_users SET username = $1, name = $2, lastname = $3, email = $4, gender_id = $5, cellphone = $6, 
        workplace = $7, workload = $8, workphone = $9, twitter = $10, facebook = $11, address = $12, 
        document_detail = $13 WHERE user_id = $14 RETURNING*`,
        [ general_data.username,  general_data.name, general_data.lastname, general_data.email, general_data.gender_id,
            general_data.cellphone, contact_data.workplace, contact_data.workload, contact_data.workphone, contact_data.twitter, 
            contact_data.facebook, personal_data.address, personal_data.document_detail, user_id], (err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                
            var user = results.rows[0]; 
            
            return res.status(200).json({
                general_data: {
                    "user_id": user.user_id,
                    "user_name": user.username,
                    "name": user.name,
                    "last_name": user.lastname,
                    "email": user.email,
                    "gender": user.gender_id,
                    "phone": user.cellphone
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

user.signup = async(req, res) =>{
    const { username, password, email } = req.body;
    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos ocurrió un error al intentar crear su cuenta.", instance:"auth/signup" });

    try {

        let salt = bcrypt.genSaltSync(10);
        let cryptedPass = bcrypt.hashSync(password, salt);

        var randomnumber1 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber2 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber3 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber4 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber5 = Math.floor(Math.random() * (9 - 0)) + 0;
        var randomnumber6 = Math.floor(Math.random() * (9 - 0)) + 0;

        otpcode = randomnumber1.toString() + "" + randomnumber2.toString() + "" + randomnumber3.toString() + "" + randomnumber4.toString() + "" + randomnumber5.toString() + "" + randomnumber6.toString();

        await db.query('SELECT * FROM chq_users WHERE username = $1 AND verificate_account = 1', [username], async (err, results) =>{
            if(err){
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                if(results.rowCount <= 0){
                    let user = results.rows[0];

                    await db.query('SELECT * FROM  chq_users WHERE email = $1 AND verificate_account = 1', [email], async(err, results) => {
                        if(err){
                            console.log(err.message);
                            return res.status(500).json(errorResponse.toJson());
                        }else{
                            
                            if(results.rowCount > 0){
                                
                                errorResponse.detail = 'Correo electrónico verificado';
                                return res.status(400).json(errorResponse.toJson());
                                        
                            }else{
                                
                                await db.query('SELECT * FROM  chq_users WHERE username = $1 AND email = $2 AND verificate_account = 0', [username, email], async(err, results) => {
                                    if(err){
                                        console.log(err.message);
                                        return res.status(500).json(errorResponse.toJson());
                                    }else{
                                        if(results.rowCount > 0){
                                            
                                            await db.query('UPDATE chq_users SET password = $1 WHERE username = $2 OR email = $3 RETURNING*', [password, username, email], (err, results)=>{
                                                if(err){
                                                    console.log(err.message);
                                                    return res.status(500).json(errorResponse.toJson());
                                                }else{
                                                    
                                                    let userUpdate = results.rows[0];
                                                    
                                                    return res.status(201).json({
                                                        user_id: userUpdate.user_id,
                                                        username: userUpdate.username,
                                                        email: userUpdate.email
                                                    });
                                                }
                                            });

                                        }else{
                                            
                                            await db.query('INSERT INTO chq_users (username, password, email) VALUES ($1, $2, $3) RETURNING*', [username, cryptedPass, email], (err, results) =>{
                                                if(err){
                                                    console.log(err.message);
                                                    return res.status(500).json(errorResponse.toJson());
                                                }else{
                                                    
                                                    let registerUser = results.rows[0];
                                                    
                                                    return res.status(201).json({
                                                        user_id: registerUser.user_id,
                                                        username: registerUser.username,
                                                        email: registerUser.email
                                                    });
                                                }
                                            });

                                        }
                                    }
                                });
                            }
                        }
                    });
                    
                }else{
                    errorResponse.detail = 'Usuario verificado';
                    return res.status(401).json(errorResponse.toJson());
                }
            }
        });
        
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'signup', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }

};

user.login = async (req, res) => {
    const { username, password } = req.body;

    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:401, detail:"Lo sentimos ocurrió un error al intentar iniciar sesión.", instance:"auth/login" });

    try {

        await db.query('SELECT * FROM chq_users WHERE username = $1', [username], (err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }

            if (results.rowCount > 0) {
                // if (results.rows[0].password == "facebook") {
                //     errorResponse.title = "Cuenta no valida";
                //     errorResponse.detail = 'Lo sentimos usted se registro con su cuenta de facebook.\nLe sugerimos que use ese metodo de inicio';
                //     return res.status(401).json(errorResponse.toJson());
                // }
                // else if (results.rows[0].password == "google") {
                //     errorResponse.title = "Cuenta no valida";
                //     errorResponse.detail = 'Lo sentimos usted se registro con su cuenta de google.\nLe sugerimos que use ese metodo de inicio';
                //     return res.status(401).json(errorResponse.toJson());
                // }


                if (!bcrypt.compareSync(password, results.rows[0].password)) {
                    errorResponse.title = "Datos incorrectos";
                    errorResponse.detail = 'Correo o contraseña invalido';
                    return res.status(401).json(errorResponse.toJson());
                }

                var user = results.rows[0];
                           
                let token = jwt.sign({ user }, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });
                
                return res.status(200).json({
                    user_id: user.user_id,
                    token: token,
                    expiresIn: Number(process.env.CADUCIDAD_TOKEN)
                });
            }
            else {
                return res.status(401).json(errorResponse.toJson());
            }

        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'login', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }


};

user.getUser = async (req, res) =>{
    const { user_id } = req.params;

    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:401, detail:"Ocurrió un error al intentar obtener el usuario.", instance:"user.auth/getUser" });

    try {

        await db.query(`SELECT * FROM chq_users WHERE user_id = $1`, [user_id], (err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                
                let user = results.rows[0];

                return res.status(200).json({
                        general_data: {
                            "user_id": user.user_id,
                            "user_name": user.username,
                            "name": user.name,
                            "last_name": user.lastname,
                            "email": user.email,
                            "gender": user.gender,
                            "phone": user.phone
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
        log('src/controllers/back', 'user.auth', 'getUser', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

user.sendVerificationOtp = async(req, res) =>{
    const { user_id, cellphone} = req.body;
    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Ocurrió un error al enviar el código de verificacion.", instance:"user.auth/sendVerificationOtp" });

    try {

        await db.query(`SELECT user_id, email FROM chq_users WHERE user_id = $1 AND active = 1`, 
        [user_id], async(err, results) => {
            if(err){
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{              
                
                if (results.rowCount > 0) {
                    let user = results.rows[0];
                    var code_expiration = moment().add(1, 'hours').format("YYYY-MM-DD HH:mm:ss");


                    var randomnumber1 = Math.floor(Math.random() * (9 - 0)) + 0;
                    var randomnumber2 = Math.floor(Math.random() * (9 - 0)) + 0;
                    var randomnumber3 = Math.floor(Math.random() * (9 - 0)) + 0;
                    var randomnumber4 = Math.floor(Math.random() * (9 - 0)) + 0;

                    otpcode = randomnumber1.toString() + "" + randomnumber2.toString() + "" + randomnumber3.toString() + "" + randomnumber4.toString();
                    
                    await db.query(`INSERT INTO chq_recover_codes (email, code, expiration_date) VALUES($1, $2, $3) RETURNING*`, [user.email, otpcode, code_expiration], (err, results) =>{
                        if(err){
                            console.log(err.message);
                            return res.status(500).json(errorResponse.toJson());
                        }else{
                            let codeData = results.rows[0];
                    
                            return res.status(201).json({
                                user_id: user.user_id,
                                otp_code: codeData.code
                            });
        
                        }
                    });
               
                }else {
                    return res.status(401).json(errorResponse.toJson());
                }
                
            }
        });
        
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'sendVerificationOtp', error, true, req, res);
        return res.status(500).json(errorResponse.toJson()); 
    }
};

user.verifyOtpCode = async(req, res) =>{
    const { user_id, code  } = req.body;
    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Ocurrió un error al intentar verificar la cuenta.", instance:"user.auth/verifyOtpCode" });

    try {
        
        await db.query(`SELECT * FROM chq_users WHERE user_id = $1 AND active = 1`, 
        [user_id], async(err, results) => {
            if(err){
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{              
                
                if (results.rowCount > 0) {
                    
                    let user = results.rows[0];
                    
                    await db.query(`SELECT * FROM chq_recover_codes WHERE email = $1 AND code = $2 AND active = 1`, [user.email, code], (err, results) =>{
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

user.refreshToken = (req, res) => {
    const { token } = req.body;

    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:400, detail:"Lo sentimos no pudimos renovar su sesión.", instance:"auth/refreshToken" });

    if (!token) {
        errorResponse.detail = 'El token de sesión no fue enviado.';
        return res.status(400).json(errorResponse.toJson());
    }

    try {

        jwt.verify(token, process.env.SEED);

        var decodedToken = jwt.decode(token);
        var user = decodedToken.user;

        const newToken = jwt.sign({ user }, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) })

        return res.status(200).json({ token: newToken });


    } catch (error) {
        console.log(error);
        return res.status(400).json(errorResponse.toJson());

    }


}

user.sendRecoverEmail = async (req, res) => {
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
                if(user > 0){
                    await db.query('UPDATE chq_recover_codes SET active = 0 WHERE email = $1', [email]);
                    await db.query('INSERT INTO chq_recover_codes (email, code, expiration_date) VALUES ($1, $2, $3)', [email, code, expiration_date], (err, results) => {
                        if (err) {
                            console.log(err.message);
                            return res.status(500).json(errorResponse.toJson());
                        }
            
                        //--- Envio de correo electronico
                        sendemail('"SOPORTE CHEQUEALO" <correo@nextdeployed.com>', email, 'Recuperacion de contraseña', `Copie el siguiente código: ${ code }`).then((result) => {
                            //console.log(result);
                        }, function (error) {
                            console.log(error.stack);
                        });
            
                        return res.status(200).json({
                            message:"Correo Enviado",
                            email
                        });
            
                    });
                }else{
                    //404: not found / no encontrado
                    errorResponse.detail = 'Correo Electrónico no encontrado';
                    return res.status(404).json(errorResponse.toJson());
                }
            }
        });
        
    } catch (error) {
        log('src/controllers/back', 'clients.auth', 'sendRecoverEmail', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }

};

user.resetPassword = async (req, res) => {
    const { code, password } = req.body;
    
    var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar reestablecer su contraseña.", instance:"auth/resetPassword" });

    try {
        
        let salt = bcrypt.genSaltSync(10);
        let cryptedPass = bcrypt.hashSync(password, salt);

        await db.query('SELECT * FROM chq_recover_codes WHERE code = $1 AND active = 1', [code], async(err, results) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json(errorResponse.toJson());
            }else{
                
                let userData = results.rows[0];
                    
                if(userData != undefined){
                    
                    let dateCurrent = new Date();
                    let formatCurrentDate  = moment(dateCurrent).format('YYYY-MM-DD hh:mm:ss');
                    
                    let isafter = moment(userData.expiration_date).isAfter(formatCurrentDate);
                    
                    if(isafter){
                                            
                        await db.query('UPDATE chq_users SET password = $1 WHERE email = $2 AND active = 1 RETURNING*', [ cryptedPass, userData.email], (err, results) =>{
                            if(err){
                                console.log(err.message);
                                return res.status(500).json(errorResponse.toJson());
                            }else{
                                
                                let passwordUpdate = results.rowCount;        

                                if(passwordUpdate > 0){
                                    
                                    db.query('UPDATE chq_recover_codes SET active = 0 WHERE code = $1', [code]);   
                                    return res.status(200).json({
                                        message: "Su contraseña ha sido reestablecida correctamente"
                                    });
                                    
                                }else{
                                    errorResponse.detail = "Lo sentimos currió un error al intentar reestablecer su contraseña.";
                                    return res.status(500).json(errorResponse.toJson());
                                }
                            }
                        });

                    }else{
                        errorResponse.detail = "El código de verificación ya expiró";
                        return res.status(400).json(errorResponse.toJson()); 
                    }

                }else{
                    errorResponse.detail = "El código ingresado es inválido";
                    return res.status(401).json(errorResponse.toJson());
                }

            }

        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'resetPassword', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }

};

user.userPhoto = async (req, res) => {
    const { user_id } = req.params;

    try {
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar la fotografía.", instance:"auth/userPhoto" });
        let photo_path;

        if (req.file.filename === "") {
            errorResponse.detail = "Ninguna fotografía seleccionada";
            return res.status(404).json(errorResponse.toJson());
        }else{
            photo_path = 'uploads/' + req.file.filename;
        }

        await db.query('UPDATE chq_users SET picture = $1 WHERE user_id = $2 RETURNING*', [photo_path, user_id], (err, results) => {
            if(err){
                log('src/controllers/back', 'user.auth', 'userPhoto', err.message, true, req, res);
            }else{
                let userPhoto = results.rows[0];
                return res.status(200).json({
                    message: userPhoto.picture
                });
            }
        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'userPhoto', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }

};

user.frontPhoto = async (req, res) => {

    const { user_id } = req.params;

    try {
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar la fotografía.", instance:"auth/frontPhoto" });
        let photo_path;

        if (req.file.filename === "") {
            errorResponse.detail = "Ninguna fotografía seleccionada";
            return res.status(404).json(errorResponse.toJson());
        }else{
            photo_path = 'uploads/' + req.file.filename;
        }

        await db.query('UPDATE chq_users SET document_photo1 = $1 WHERE user_id = $2 RETURNING*', [photo_path, user_id], (err, results) => {
            if(err){
                log('src/controllers/back', 'user.auth', 'frontPhoto', err.message, true, req, res);
            }else{
                let frontPhoto = results.rows[0];
                return res.status(200).json({
                    photo: frontPhoto.document_photo1
                });
            }
        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'frontPhoto', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};

user.backPhoto = async (req, res) => {
    const { user_id } = req.params;

    try {
        var errorResponse = new ErrorModel({ type: "Auth", title:"Falló la función", status:500, detail:"Lo sentimos currió un error al intentar actualizar la fotografía.", instance:"auth/backPhoto" });
        let photo_path;

        if (req.file.filename === "") {
            errorResponse.detail = "Ninguna fotografía seleccionada";
            return res.status(404).json(errorResponse.toJson());
        }else{
            photo_path = 'uploads/' + req.file.filename;
        }

        await db.query('UPDATE chq_users SET document_photo2 = $1 WHERE user_id = $2 RETURNING*', [photo_path, user_id], (err, results) => {
            if(err){
                log('src/controllers/back', 'user.auth', 'backPhoto', err.message, true, req, res);
            }else{
                let frontPhoto = results.rows[0];
                return res.status(200).json({
                    photo: frontPhoto.document_photo1
                });
            }
        });
    } catch (error) {
        log('src/controllers/back', 'user.auth', 'backPhoto', error, true, req, res);
        return res.status(500).json(errorResponse.toJson());
    }
};


module.exports = user;