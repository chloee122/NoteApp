"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (request, _response, next) => {
    logger_1.default.info("Method:", request.method);
    logger_1.default.info("Path:  ", request.path);
    logger_1.default.info("Body:  ", request.body);
    logger_1.default.info("---");
    next();
};
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, _request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }
    else if (error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")) {
        return response
            .status(400)
            .json({ error: "expected `username` to be unique" });
    }
    else if (error.name === "MongoServerError") {
        return response
            .status(400)
            .json({ error: "expected `username` to be unique" });
    }
    else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "token invalid" });
    }
    else if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "token expired",
        });
    }
    next(error);
};
exports.default = {
    requestLogger,
    errorHandler,
    unknownEndpoint,
};
