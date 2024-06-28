import axios from "axios";
import { Note } from "../common/internal";
import { NoteToSend } from "../common/api.types";


interface GetAllResponse {
  data: Note[];
}

interface CreateResponse {
data: Note;
}

interface UpdateResponse {
  data: Note;
}

const baseUrl = "/api/notes";

let token:string|null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (): Promise<Note[]> => {
  const response: GetAllResponse = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject: NoteToSend): Promise<Note> => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response: CreateResponse = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async(id: string, newObject: Note): Promise<Note> => {
  const response: UpdateResponse = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
};
