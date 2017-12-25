const express = require("express");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

const router = express.Router();

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "rahul" && password === "nair") {
    const accessToken = jwt.sign(username, process.env.JWT_SECRET);
    const refreshToken = randomstring.generate(48);
    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } else {
    const err = new Error("authentication failed");
    err.status = 400;

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

router.post("/logout", (req, res, next) => {
  res.redirect("../");
});

module.exports = router;
