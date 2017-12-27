import * as express from "express";
import {createAccessToken, createRefreshToken} from  "../service/tokenService";
import * as db from "../service/db";

const router = express.Router();

router.post("/login", (req, res, next) => {
  
  const username = req.body.username;
  const password = req.body.password;

  if (username === "rahul" && password === "nair") {
    const accessToken = createAccessToken(username);
    const refreshToken = createRefreshToken();
    db.saveToken(refreshToken);
    res
      .contentType("application/json")
      .status(200)
      .json({
        accessToken,
        refreshToken
      });
  } else {
    res
      .contentType("application/json")
      .status(400)
      .json({
        message: "authentication failed",
        status: 400
      });
  }
});

router.post("/token", (req, res, next) => {
  const username = req.body.username;
  const refreshTokenReceived = req.body.refreshToken;
  if (db.tokenExists(refreshTokenReceived)) {
    const accessToken = createAccessToken(username);
    res
      .contentType("application/json")
      .status(200)
      .json({
        accessToken
      });
  } else {
    res
      .contentType("application/json")
      .status(400)
      .json({
        message: "refresh token invalid",
        status: 400
      });
  }
});

export default router;