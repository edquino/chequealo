var moment = require('moment');
moment.locale('es');
moment.defaultFormat = "DD/MM/YYYY";

module.exports = {

    stateDetails: function (has_details, options) {
        if (has_details == 1) {
            return 'Activo';
        }
        else if (has_details == 0) {
            return 'Inactivo';
        }
    },

    Authorization: function (id_usuario, options){

        if(id_usuario == undefined){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showFormElements: function (value, options){
        if(value == 1){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showFormElementsShowModife: function(value,options){
        if(value == 1){
            return 'checked';
        }else if(value == 2){
            return 'checked';
        }else{
            return '';
        }
    },
    

    showFormElementsSiderbar: function (value, options){
        if(value != 1){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },
 
    isAdmin: function (id_perfil, options) {
        //if(id_perfil == 1){
        if(id_perfil == 999){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    siderbardOptionsAdministracion: function(administration, options){
        if(administration != 0){
            return options.fn(this);
        }
    },

    siderbardOptionsCatalogos: function(catalogos, options){
        if(catalogos != 0){
            return options.fn(this);
        } 
    },

    siderbardOptionsDashboard: function(dashboard, options){
        if(dashboard != 0 ){
            return options.fn(this);
        }
    },

    siderbardOptionsAlert: function(alert, options){
        if(alert != 0 ){
            return options.fn(this);
        }
    },

    //Switch For update Alert
    showProteccionVigente: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showHuboAgresion: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showDialogoConflicto: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showMedidaConflicto: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showDialogoRotoConflicto: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    ShowCrisisConflicto: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    ShowResolucionConflicto: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    ShowCantPersonaInvolucrada: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showPresenciaFuerzaPublica: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showIntervencionFuerzaPublica: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showGrupoAgresion: function (value, options){
        if(value == true){
            return 'block';
        }else{
            return 'none';
        }
    },

    showListAccionesHechoAnterios: function (value, options){
        if(value == true){
            return 'block';
        }else{
            return 'none';
        }
    },

    showOptionIntervencionFuerzaPublica: function (value, options){
        if(value == true){
            return 'block';
        }else{
            return 'none';
        }
    },

    showFechaFuturaHechos: function (value, options){
        if(value == true){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    showOptionFechaReporte: function (value, options){
        if(value == true){
            return 'block';
        }else{
            return 'none';
        }
    },

    //Show Form Prensa Escrita
    showPrensaEscrita: function (value1) {
        if (value1 === "") {
            return 'none';
        } else {
            return 'block';
        }
    },

    //Show Form Radio/Tv
    showFormTvRadio: function (value1) {
        if (value1 === "") {
            return 'none';
        } else {
            return 'block';
        }
    },

    //Show Form Radio/Tv
    showFormTvRadio: function (value1){
        if(value1 === ""){
            return 'none';
        }else{
            return 'block';
        }
    },

    //Show Form Colectivos
    showFormColectivos: function (value1){
        if(value1 === ""){
            return 'none';
        }else{
            return 'block';
        }
    },

    //Show Form Instituaciones Gubernamentales
    showIntGubernamentales: function (value1){
        if(value1 === ""){
            return 'none';
        }else{
            return 'block';
        }
    },

    //show Form ong-internacionales
    showOngInternacionales: function (value1){
        if(value1 === ""){
            return 'none';
        }else{
            return 'block';
        }
    },

    //show for mensajeria
    showFormMensajeria: function (value1){
        if(value1 === ""){
            return 'none';
        }else{
            return 'block';
        }
    },

    //show Otras
    showFormOtras: function (value1) {
        if (value1 === "") {
            return 'none';
        } else {
            return 'block';
        }
    },

    //show medios digitales
    showMediosDigitales: function (value1) {
        if (value1 === "") {
            return 'none';
        } else {
            return 'block';
        }
    },

    //Show Tipo Modulo
    tipoModulo: function(value1){
        if (value1 == 1) {
            return 'Aplicación Móvil';
        } else {
            return 'Dashboard Web';
        }
    },

    //Validate Alert If is Analized
    showAlertAnalyzed: function (value, options){
        if(value == null || value == false){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    //show option alert - administrador
    showOptionsAlert: function(user_perfil, options){
        if(user_perfil == 1 ){
            return options.fn(this);
        }
    },

    //show option alert - consulta
    showOptionsAlertConsulta: function (value, options) {
        if (value == 1) {
            return options.fn(this);
        }
    },

    
    //show option alert - tecnico
    showOptionsAlertTecnico: function (value, options) {
        if (value == 2) {
            return options.fn(this);
        }
    },

    //show option alert - supervisor
    showOptionsAlertSupervisor: function (value, options) {
        if (value == 3) {
            return options.fn(this);
        }
    },

    //show option alert - Analista
    showOptionsAlertAnalista: function (value, options) {
        if (value == 4) {
            return options.fn(this);
        }
    },

    //Show Button Nuevo Alerta
    ShowOptionViewAlert: function (value, options) {
        if (value == 2 || value == 3) {
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    //Hidden button Modify if an alert to be analyzed was sent
    HiddenButtonModify: function(value, options) {
        if (value == false ) {
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    },

    ShowIconAnalize: function(value, option) {
        if(value == false){
            return option.fn(this);
        }else{
            return option.inverse(this);
        }
    },

    ShowButtonCreateBanner: function(value, option){
        if(value == 1){
            return option.fn(this);
        }else{
            return option.inverse(this);
        }
    },
    
    Relatedcase: function(value, option){
        if(value == true){
            return option.fn(this);
        }else{
            return option.inverse(this);
        }
    }

}