import useAppContext from "../../hooks/useAppContext";
import type { Note } from "../../common/internal";
import { NoteItemWrapper } from "../styles/NoteItem.styled";
import { IoCloseSharp } from "react-icons/io5";

interface NoteDetailsProps {
  note: Note;
}

function NoteItem({ note }: NoteDetailsProps) {
  const { toggleImportance } = useAppContext();

  const label = note.important ? "Make not important" : "Make important";

  return (
    <NoteItemWrapper className="note" $important={note.important}>
      <div>
        <span>{note.content}</span>
      </div>
      <div className="btns">
        <button className="delete">
          <IoCloseSharp />
        </button>
        <button onClick={() => toggleImportance(note.id)}>{label}</button>
      </div>
    </NoteItemWrapper>
  );
}

export default NoteItem;
