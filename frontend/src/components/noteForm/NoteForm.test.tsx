import { render, screen } from "@testing-library/react";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";
import { AppContext } from "../../context/AppContext";

test("<NoteForm/> updates parent state and calls onSubmit", async () => {
  const mockAddNote = vi.fn();

  const mockToggle = vi.fn();
  const contextValue = {
    addNote: mockAddNote,
    user: { token: "testtoken", name: "Chloe", username: "chloeng" },
    notes: [],
    login: () => {},
    logout: () => {},
    toggleImportance: () => {},
    errorMessage: "",
    noteFormRef: {
      current: {
        toggleVisibility: mockToggle,
      },
    },
  };
  const user = userEvent.setup();

  render(
    <AppContext.Provider value={contextValue}>
      <NoteForm />
    </AppContext.Provider>
  );

  const input = screen.getByPlaceholderText("write note content here");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(mockAddNote.mock.calls).toHaveLength(1);
  expect(mockAddNote.mock.calls[0][0].content).toBe("testing a form...");
});
