import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "./utils/logger";
import getEnvVar from "./utils/getEnvVar";

export const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
  ) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
  };

export const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "MongoServerError") {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

export const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

export interface RequestWithUserId extends Request {
  userId?: string;
}

export const validateToken = (
  request: RequestWithUserId,
  response: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(request);
  if (!token) {
    return response.status(401).json({ error: "Token is not provided" });
  }
  try {
		const decodedToken = jwt.verify(
			token,
			getEnvVar("SECRET")
		) as jwt.JwtPayload;
		request.userId = decodedToken.id;
		next();
	} catch (error) {
		response.status(403).json({ error: "Unauthorized" });
	}
};

export const validateSignUpData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, email, username, password } = request.body;

  if (!name || name.trim().length < 3) {
    return response
      .status(400)
      .json({ error: "Name with 3 or more characters is required" });
  }

  if (!email || !email.trim()) {
    return response.status(400).json({ error: "Email is required" });
  }

  if (!username || username.trim().length < 6) {
    return response
      .status(400)
      .json({ error: "Username with 6 or more characters is required" });
  }

  if (!password || password.trim().length < 6) {
    return response
      .status(400)
      .json({ error: "Password with 6 or more characters is required" });
  }

  next();
};
