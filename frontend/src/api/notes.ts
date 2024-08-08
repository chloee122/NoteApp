import axios from "axios";
import type { Note } from "../common/internal";
import type { NoteToSend } from "../common/api.types";

export const noteApiClient = axios.create({
  baseURL: "/api/notes",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAll = async (): Promise<Note[]> => {
  const response = await noteApiClient.get<Note[]>("");
  return response.data;
};

export const create = async (newObject: NoteToSend): Promise<Note> => {
  const response = await noteApiClient.post<Note>("", newObject);
  return response.data;
};

export const update = async (id: string, newObject: Note): Promise<Note> => {
  const response = await noteApiClient.put<Note>(`/${id}`, newObject);
  return response.data;
};

export const remove = async (id: string): Promise<void> => {
  await noteApiClient.delete(`/${id}`);
};
