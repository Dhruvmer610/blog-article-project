const mongoose = require('mongoose');

var registerSchema = new mongoose.Schema({


    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: Number,
    otp: Number,
    tokens: { type: String },

},
    { timestamps: true },
);
var registerModel = mongoose.model('register', registerSchema);
module.exports = registerModel;