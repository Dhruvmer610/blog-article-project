require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.tokenGen = (foundUser) => {
    var jwtSecretKey = process.env.SECRET_KEY
    const token = jwt.sign(foundUser, jwtSecretKey);
    return token;
}


// exports.otpGen = (length) => {
//     var result = '';
//     var characters = '0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() *
//             charactersLength));
//     }
//     return result;
// }