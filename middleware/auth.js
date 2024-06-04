var registerModel = require("../model/registerModel")

const jwt = require('jsonwebtoken');

exports.logincheck = async (req, res, next) => {
    try {
        var token = req.headers.logintoken
        var jwtSecretKey = process.env.SECRET_KEY
        const verified = await jwt.verify(token, jwtSecretKey);
        // console.log(verified);
        if (verified) {
            var logincheck = await registerModel.findOne({ _id: verified._id }).lean();
            // console.log(logincheck);
            if (logincheck == null) {
                var response = {
                    status: false,
                    message: "not found user",
                }
                return res.status(401).send(response)
            }
            delete logincheck.password;
            req.user = logincheck
            next()
        }
        else {
            res.send("Invalid token");
        }
    }
    catch (error) {
        var response = {
            status: false,
            message: error.message
        }
        return res.send(response)
    }
}   