import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteItem from "./NoteItem";
import { AppContext } from "../../context/AppContext";

test("renders content", () => {
  const note = {
    id: "1",
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const contextValue = {
    addNote: () => {},
    user: { token: "testtoken1", name: "Chloe", username: "chloeng" },
    notes: [],
    login: () => {},
    logout: () => {},
    toggleImportance: () => {},
    removeNote: () => {},
  };

  render(
    <AppContext.Provider value={contextValue}>
      <NoteItem note={note} />
    </AppContext.Provider>
  );

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
  const note = {
    id: "1",
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockToggleImportance = vi.fn();

  const contextValue = {
    addNote: () => {},
    user: { token: "testtoken", name: "Chloe", username: "chloeng" },
    notes: [],
    login: () => {},
    logout: () => {},
    toggleImportance: mockToggleImportance,
    removeNote: () => {},
  };

  render(
    <AppContext.Provider value={contextValue}>
      <NoteItem note={note} />
    </AppContext.Provider>
  );

  const user = userEvent.setup();
  const button = screen.getByText("Make not important");
  await user.click(button);

  expect(mockToggleImportance.mock.calls).toHaveLength(1);
});
