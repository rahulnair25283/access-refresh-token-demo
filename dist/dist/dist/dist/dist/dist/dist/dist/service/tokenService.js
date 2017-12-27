"use strict";
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const createAccessToken = payload => jwt.sign({
    payload
}, process.env.JWT_SECRET, {
    expiresIn: 20,
    subject: payload
});
const createRefreshToken = () => randomstring.generate(Number(process.env.REFRESH_TOKEN_LENGTH));
module.exports = {
    createAccessToken,
    createRefreshToken
};
//# sourceMappingURL=tokenService.js.map