
function PersonalDataModel({
    address,
    document_detail,
    document_photo1,
    document_photo2
}) {

    this.address = address;
    this.document_detail = document_detail;
    this.document_photo1 = document_photo1;
    this.document_photo2 = document_photo2;
}

PersonalDataModel.prototype.toJson = function () {
    return {
        "address": this.address,
        "document_detail": this.document_detail,
        "document_front_pic": this.document_photo1,
        "document_back_pic": this.document_photo2
    };
}


module.exports = PersonalDataModel;