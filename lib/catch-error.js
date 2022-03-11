const Log = require('log-to-file');


const log = (ruta,controller,funcion,message,back,req,res) =>{
    var error = '\n';
    error += `archivo: ${controller}.controller\n`;
    error += `ruta: ${ruta}\n`;
    error += `funcion: ${funcion}\n`;
    error += `error: ${message}\n`;
    error += '--------------------------------------------------------------------------------------------\n';
    Log(error);
    console.log(error);
    if(back == true){
        return res.status(500).json({ error });
    }
    else
    {
        return res.render('errors-pages/error-500');
    }
}

module.exports = log;