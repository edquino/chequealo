
function ContactDataModel({
    workplace,
    workload,
    workphone,
    twitter,
    facebook
}) {

    this.workplace = workplace;
    this.workload = workload;
    this.workphone = workphone;
    this.twitter = twitter;
    this.facebook = facebook;
}

ContactDataModel.prototype.toJson = function () {
    return {
        "work_place": this.workplace,
        "job_position": this.workload,
        "work_phone": this.workphone,
        "twitter": this.twitter,
        "facebook": this.facebook
    };
}


module.exports = ContactDataModel;