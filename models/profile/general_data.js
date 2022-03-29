
function GeneralDataModel({user_id,
    username,
    name,
    lastname,
    email,
    gender_id,
    cellphone,
    picture }) {

    this.user_id = user_id,
    this.username = username,
    this.name =name,
    this.lastname = lastname,
    this.email = email,
    this.gender_id = gender_id,
    this.cellphone = cellphone,
    this.picture = picture
}

GeneralDataModel.prototype.toJson = function () {
    return {
        "user_id": this.user_id,
        "user_name": this.username,
        "name": this.name,
        "last_name": this.lastname,
        "email": this.email,
        "gender_id": this.gender_id,
        "phone": this.cellphone,
        "profile_picture": this.picture
    };
}


module.exports = GeneralDataModel;