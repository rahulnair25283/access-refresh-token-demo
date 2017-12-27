import * as jwt from "jsonwebtoken";
import * as randomString from "randomstring";

export const createAccessToken = payload =>
  jwt.sign(
    {
      payload
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 20,
      subject: payload
    }
  );

export const createRefreshToken = () =>
  randomString.generate(Number(process.env.REFRESH_TOKEN_LENGTH));
