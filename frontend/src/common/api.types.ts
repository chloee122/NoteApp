import type { Note } from "./internal";

export type NoteToSend = Omit<Note, "id">;

export interface SignUpFormData {
  username: string;
  email: string;
  name: string;
  password: string;
}

export interface LoginInFormData {
  username: string;
  password: string;
}
