const jwt = require('jsonwebtoken');

const secretaccesstoken = process.env.ACCESS_TOKEN_SECRET || "scretkey-accesstoken"
const secretrefreshtoken = process.env.REFRESH_TOKEN_SECRET || "scretkey-refreshtoken"


const generateaccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secretaccesstoken, { expiresIn: '7d' });
}


const generaterefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secretrefreshtoken, { expiresIn: '20d' });
}

module.exports = { 
    generateaccessToken,
    generaterefreshToken,
    secretaccesstoken,
    secretrefreshtoken

};