var helper = require('../helper/helperValidation');

exports.userValidation = (req, res, next) => {
    var filds = req.body
    var totalfild = ["name", "email", "password", "mobileNumber"];
    var email = req.body.email;
    var phone = req.body.mobileNumber;
    // var password = req.body.password;
    var errormsg = {};
    var isvalid = true;

    for (var fild of totalfild) {
        var validate = helper.fildvalidation(filds[fild]);
        if (!validate.status) {
            isvalid = false;
            errormsg.fild = validate.error;
        }
    }
    if (!helper.emailvalidation(email)) {
        isvalid = false;
        errormsg.email = "Please enter valid email";
    }
    if (!helper.phonevalidation(phone)) {
        isvalid = false;
        errormsg.phone = "Please enter valid phone number";
    }
    if (!isvalid) {
        return res.status(400).send({ status: false, error: errormsg });
    }
    next();
}