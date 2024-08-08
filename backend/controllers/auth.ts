import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router, Response, Request } from "express";
import User from "../models/user";
import getEnvVar from "../utils/getEnvVar";
import * as middleware from "../middleware";
import createTokens from "../utils/createTokens";

const authRouter = Router();

authRouter.post("/log-in", async (request: Request, response: Response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password",
		});
	}

	const { accessToken, refreshToken } = createTokens(user.username, user.id);

	user.refreshToken = refreshToken;
	await user.save();

	response.status(200).send({
		accessToken,
		refreshToken,
		username: user.username,
		name: user.name,
	});
});

authRouter.post("/sign-up", middleware.validateSignUpData ,async (request, response) => {
	const { name, email, username, password } = request.body;

	const emailExists = await User.findOne({
		email
	});
	const userExists = await User.findOne({
		username
	});

	if (emailExists) {
		return response.status(400).json( { error: "Email already exists" } );
	} else if (userExists) {
		return response.status(400).json( { error: "User already exists" } );
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		name,
		email,
		username,
		passwordHash,
	});

	const createdUser = await user.save();

	const { accessToken, refreshToken } = createTokens(createdUser.username, createdUser.id);

	user.refreshToken = refreshToken;
	await user.save();

	response.status(201).json({
		accessToken,
		refreshToken,
		username: createdUser.username,
		name: createdUser.name
	});
});

authRouter.post("/refresh", async (request: Request, response: Response) => {
	const { refreshToken } = request.body;
	if (!refreshToken) {
		return response.status(401).json({ error: "Unauthorized" });
	}

	try {
		const decodedRefreshToken = jwt.verify(
			refreshToken,
			getEnvVar("SECRET")
		) as jwt.JwtPayload;
		const { id } = decodedRefreshToken;
		const user = await User.findById(id);
		if (!user || user.refreshToken !== refreshToken) {
			return response.status(401).json({ error: "Unauthorized" });
		}

		const { accessToken } = createTokens(user.username, user.id);

		response.status(200).json({  accessToken: accessToken  });
	} catch (error) {
		response.status(401).json({ error: "Your session has expired. Please log in again to continue using the app." });
	}
});

export default authRouter;
