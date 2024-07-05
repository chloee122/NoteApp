import { Router } from "express";

const redirectRouter = Router();

redirectRouter.get("/", (_request, response) => {
  response.redirect("/");
  //   request.url = "/api/notes";
});

export default redirectRouter;
