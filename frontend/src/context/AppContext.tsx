import { createContext, useState, useEffect, ReactNode } from "react";
import noteService from "../api/notes";
import loginService from "../api/login";
import type { Note, User } from "../common/internal";
import type { NoteToSend } from "../common/api.types";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  user: User | null;
  notes: Note[];
  login: (username: string, password: string) => void;
  logout: () => void;
  addNote: (note: NoteToSend) => void;
  toggleImportance: (id: string) => void;
  errorMessage: string;
}

export const AppContext = createContext<null | AppContextType>(null);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<AppContextType["user"]>(null);
  const [notes, setNotes] = useState<AppContextType["notes"]>([]);
  const [errorMessage, setErrorMessage] =
    useState<AppContextType["errorMessage"]>("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response: Note[] = await noteService.getAll();
        setNotes(response);
      } catch (err) {
        if (err instanceof Error) setErrorMessage(err.message);
      }
    };

    getNotes();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON) as User;
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const user: User = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Wrong credentials");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const addNote = async (noteObject: NoteToSend) => {
    try {
      const returnedNote: Note = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  const toggleImportance = async (id: string): Promise<void> => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const changedNote = { ...note, important: !note.important };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        notes,
        login,
        logout,
        addNote,
        toggleImportance,
        errorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
