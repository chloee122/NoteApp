import { Router, Request } from "express";
import Note from "../models/note";
import User from "../models/user";
import jwt from "jsonwebtoken";

const notesRouter = Router();

const getTokenFrom = (request: Request) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}

	return null;
};

notesRouter.get("/", async (_request, response) => {
	const notes = await Note.find({});
	response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
	const note = await Note.findById(request.params.id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

notesRouter.post("/", async (request, response) => {
	const body = request.body;
	const token = getTokenFrom(request);
	if (process.env.SECRET && token) {
		// CHECK
		const decodedToken = jwt.verify(
			token,
			process.env.SECRET
		) as jwt.JwtPayload; // Check again
		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}

		const user = await User.findById(decodedToken.id);

		if (user) {
			const note = new Note({
				content: body.content,
				important: body.important || false,
				user: user.id,
			});

			const savedNote = await note.save();
			user.notes = user.notes.concat(savedNote._id);
			await user.save();

			response.status(201).json(savedNote);
		}
	}
});

notesRouter.delete("/:id", async (request, response) => {
	await Note.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

notesRouter.put("/:id", (request, response, next) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => next(error));
});

export default notesRouter;
