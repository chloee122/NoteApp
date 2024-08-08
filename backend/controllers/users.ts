import { Router, Request, Response } from "express";
import User from "../models/user";

const usersRouter = Router();

usersRouter.get("/", async (_request: Request, response: Response) => {
	const users = await User.find({});
	response.json(users);
});

export default usersRouter;
