import jwt from "jsonwebtoken";
import getEnvVar from "./getEnvVar";

const ACCESS_TOKEN_EXPIRY = "10s";
const REFRESH_TOKEN_EXPIRY = "1d";

const createTokens = (username: string, id: string) => {
  const accessToken = jwt.sign({ username, id }, getEnvVar("SECRET"), {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({ username, id }, getEnvVar("SECRET"), {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};

export default createTokens;
