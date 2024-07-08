"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redirectToRootRouter = (0, express_1.Router)();
redirectToRootRouter.get("/", (_request, response) => {
    response.redirect("/");
});
exports.default = redirectToRootRouter;
