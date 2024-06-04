    var validator = require('validator');

exports.fildvalidation = (fild) => {
    var message = [];
    isvalid = true;
    if (!fild) {
        isvalid = false;
        message = ["Plase enter all filds"];
    }
    return { status: isvalid, error: message };
}

exports.emailvalidation = (email) => {
    return validator.isEmail(email);
}

exports.phonevalidation = (phone) => {
    return validator.isMobilePhone(phone, 'en-IN');
}