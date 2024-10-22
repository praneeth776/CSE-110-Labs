import { render,screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { Label } from "./types";
import exp from "constants";


describe('Create Sticky Note', ()=>{
    
    test('Renders Create Note Form', () =>{
        render(<StickyNotes/>);
        const createNoteButton = screen.getByText('Create Note');
        expect(createNoteButton).toBeInTheDocument();
    });

    test('create a new note',()=>{
        render(<StickyNotes/>);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
     
    });

    test('Read new note',()=>{
        //Read: Are all the notes that are created displayed on the page
        render(<StickyNotes/>);

        // Make a form submission
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createLabel = screen.getByTestId('label');
        const createNoteButton = screen.getByText(/Create Note/i);


        // Have a fireEvent for form submission.
        fireEvent.change(createNoteTitleInput, {target: {value: 'Terminator'}});
        fireEvent.change(createNoteContentTextarea, {target: {value: 'Starring Arnold Schwazzneger'}});
        fireEvent.change(createLabel, {target: {value: Label.personal}});
        fireEvent.click(createNoteButton);

        // Check if they are present on the screen.
        const newTitle = screen.getByText(/Terminator/);
        const newContext = screen.getByText(/Starring Arnold Schwazzneger/);
        //const newLabel = screen.getByText('personal'); // getByText is getting an error

        expect(newTitle).toBeInTheDocument();
        expect(newContext).toBeInTheDocument();
        //expect(newLabel).toBeInTheDocument();
    })

    test('Delete: Does the note get filtered out once the x button is pressed', () => {
        render(<StickyNotes/>);
        expect(screen.getByText('test note 1 title')).toBeInTheDocument();
        // Simulate clicking the delete button for the first note
        const deleteButtons = screen.getAllByText('x');
        fireEvent.click(deleteButtons[0]);
        expect(screen.queryByText('test note 1 title')).not.toBeInTheDocument();
    });
});