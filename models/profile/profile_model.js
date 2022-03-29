const PersonalDataModel = require('./personal_data');
const GeneralDataModel = require('./general_data');
const ContactDataModel = require('./contact_data');



function ProfileModel({ user}) {
    this.version = user.version,
    this.general_data = new GeneralDataModel({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        gender_id: user.gender_id,
        cellphone: user.cellphone,
        picture: user.picture
    }),
    this.contact_data = new ContactDataModel({
        workplace: user.workplace,
        workload: user.workload,
        workphone: user.workphone,
        facebook: user.facebook,
        twitter: user.twitter
    }),
    this.personal_data = new PersonalDataModel({
        address: user.address,
        document_detail: user.document_detail,
        document_photo1: user.document_photo1,
        document_photo2: user.document_photo2
    })  
}

ProfileModel.prototype.toJson = function () {
    return {
        "version": this.version,
        "general_data": this.general_data.toJson(),
        "contact_data": this.contact_data.toJson(),
        "personal_data": this.personal_data.toJson()
    };
}

module.exports = ProfileModel;