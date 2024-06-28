import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../noteForm/NoteForm";
import useAppContext from "../../hooks/useAppContext";
import NoteList from "../noteList/NoteList";
import {
  MainPageWrapper,
  UserSection,
  NoteView,
} from "../styles/MainPage.styled";

import Button from "../styles/shared/Button.styled";

function MainPage() {
  const [showAll, setShowAll] = useState(true);
  const navigate = useNavigate();
  const { notes, logout, user } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  if (!user) return;
  return (
    <MainPageWrapper>
      <UserSection>
        <p>{user.name} logged in</p>
        <Button
          $width={100}
          $noBorder={true}
          $color={"white"}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </UserSection>
      <NoteForm />
      <NoteView>
        <Button $width={180} onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </Button>
        <NoteList notes={notesToShow} />
      </NoteView>
    </MainPageWrapper>
  );
}

export default MainPage;
