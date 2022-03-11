function ErrorModel ({type,title,status,detail,instance}){
    this.type = type;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
}

ErrorModel.prototype.toJson = function (){
    return {
        "type": this.type,
        "title": this.title,
        "status": this.status,
        "detail": this.detail,
        "instance": this.instance
    };
}

module.exports = ErrorModel;