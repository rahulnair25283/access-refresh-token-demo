const express = require("express");
const tokenService = require("../service/tokenService");
const db = require("../service/db");
const router = express.Router();
router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "rahul" && password === "nair") {
        const accessToken = tokenService.createAccessToken(username);
        const refreshToken = tokenService.createRefreshToken();
        db.saveToken(refreshToken);
        res
            .contentType("application/json")
            .status(200)
            .json({
            accessToken,
            refreshToken
        });
    }
    else {
        const err = new Error("authentication failed");
        err.status = 400;
        res
            .contentType("application/json")
            .status(400)
            .json({
            message: err.message,
            status: err.status
        });
    }
});
router.post("/token", (req, res, next) => {
    const username = req.body.username;
    const refreshTokenReceived = req.body.refreshToken;
    if (db.tokenExists(refreshTokenReceived)) {
        const accessToken = tokenService.createAccessToken(username);
        res
            .contentType("application/json")
            .status(200)
            .json({
            accessToken
        });
    }
    else {
        const err = new Error("refresh token invalid");
        err.status = 400;
        res
            .contentType("application/json")
            .status(400)
            .json({
            message: err.message,
            status: err.status
        });
    }
});
module.exports = router;
