const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "mail.nextdeployed.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "correo@nextdeployed.com",
      pass: "NextServices2021#"
      //pass: "NextServices2021#"
    },
    tls: {
        rejectUnauthorized: false
    }
});


const sendEmail = async (from,to,subject,text) => {
    return new Promise((resolve,reject) => {
   
        var mailOptions = {
            from,
            to,
            subject,
            text
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(new Error(error));
            } else {
               resolve(true);
            }
        });

    });
 
}


module.exports = sendEmail;