var bcrypt = require('bcrypt');
var registerModel = require("../../model/registerModel")
var bcrypt = require('bcrypt');
var tokenHelper = require('../../helper/tokenHelper');
exports.register = async (req, res) => {

    var { name, email, password, mobileNumber } = req.body
    try {
        const existingUser = await registerModel.findOne({ email })
        if (existingUser) {
            var response = {
                status: false,
                message: "Email is already exits."
            }
            return res.send(response)
        }
        password = await bcrypt.hash(req.body.password, 10);
        var registerDetail = new registerModel({
            name,
            email,
            password,
            mobileNumber
        });
        console.log("registerDetail", registerDetail)

        var data = await registerDetail.save()
        return res.send(
            {
                status: true,
                message: "User Registered Successfully",
                data
            })
    }
    catch (error) {
        var response = {
            status: false,
            message: error.message
        }
        return res.send(response)
    }
}

exports.login = async (req, res, next) => {
    try {
        var checkUser = await registerModel.findOne({ email: req.body.email }).lean();
        if (checkUser) {
            var submitPassword = req.body.password
            var storedPassword = checkUser.password

            const passwordsMatch = await bcrypt.compare(submitPassword, storedPassword)
            if (passwordsMatch) {
                var token = await tokenHelper.tokenGen(checkUser)
                var response = {
                    status: true,
                    message: "Successfully logged in",
                    data: {
                        _id: checkUser._id,
                        name: checkUser.name,
                        email: checkUser.email,
                        mobileNumber: checkUser.mobileNumber,
                        token
                    }
                }
                return res.send(response)
            }
            else {
                res.send({
                    status: false,
                    message: "Passwords do not match"
                })
            }
        }
        else {
            var fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
            res.send({
                status: false,
                message: "Invalid email"
            })
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

exports.upadetUser = async (req, res) => {
    try {
        var { name, email, mobileNumber } = req.body
        var updatedData = { name, email, mobileNumber }
        await registerModel.updateOne({ _id: req.user._id }, { $set: updatedData })

        var response = {
            status: true,
            message: "User updated successfully"
        }
        return res.send(response)
    }
    catch (error) {
        var response = {
            status: false,
            message: error.message
        }
        return res.send(response)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;

       await registerModel.deleteOne({ _id: userId });

        var response = {
            status: true,
            message: "User deleted successfully"
        };
        return res.send(response);
    }
    catch (error) {
        var response = {
            status: false,
            message: error.message
        };
        return res.status(500).send(response);
    }
};
