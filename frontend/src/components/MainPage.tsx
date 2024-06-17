import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";
import useAppContext from "../hooks/useAppContext";
import NoteList from "./NoteList";

function MainPage() {
  const [showAll, setShowAll] = useState(true);
  const navigate = useNavigate();
  const { notes, logout, user, noteFormRef } = useAppContext();

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm />
      </Togglable>
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  if (!user) return;
  return (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
      {noteForm()}
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      {/* <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul> */}
      <NoteList notes={notesToShow} />
    </div>
  );
}

export default MainPage;
