import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { NoteFormWrapper, Form } from "../styles/NoteForm.styled";
import Input from "../styles/shared/Input.styled";
import Button from "../styles/shared/Button.styled";

function NoteForm() {
  const [newNote, setNewNote] = useState("");
  const { addNote } = useAppContext();

  const handleAddNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <NoteFormWrapper className="formDiv">
      <Form onSubmit={handleAddNote}>
        <Input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="Write note content here"
        />
        <Button type="submit">Save</Button>
      </Form>
    </NoteFormWrapper>
  );
}

export default NoteForm;
