import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme ,{ ClickCounter } from './hooksExercise';
import { useState } from 'react';



function App() {
    // use State that stores the information about the notecards and an array that keeps track of the favs among them
    // Pass this state as props to the notecards
    
    const [notes,setNotes] = useState<Note[]>(dummyNotesList);
    const [favs,setFavs] = useState<number[]>([]);
    
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        fav: false
    };
    const [selectedNote, setSelectedNote] = useState(initialNote);
    const [createNote, setCreateNote] = useState(initialNote);
     
    function handleFav(id: number){
        if(favs.includes(id)){
            setFavs(favs.filter(a=> a !== id));
        } else{
            setFavs([...favs,id])
        }
    }

    function handleDelete(id: number){
        console.log(`Delete clicked for the note : ${id}`);
        setNotes(notes.filter(a => a.id !== id));
    }

    function handleFormSubmission(event: React.FormEvent){
        console.log(`Form Submitted.`)
        event.preventDefault();
        console.log("title: ", createNote.title);
        console.log("content: ", createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
    }


 return (
    <div className='app-container'>
    <form className="note-form" onSubmit={handleFormSubmission}>
      <div>
        <input
          placeholder="Note Title"
          onChange={(event) =>
            setCreateNote({ ...createNote, title: event.target.value })}
          required>
        </input>
      </div>

      <div>
        <textarea
          onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })}
          required>
        </textarea>
      </div>

<div>
       <select
         onChange={(event) =>
           setCreateNote({ ...createNote, label: event.target.value as Label })}
         required>
         <option value={Label.personal}>Personal</option>
         <option value={Label.study}>Study</option>
         <option value={Label.work}>Work</option>
         <option value={Label.other}>Other</option>
       </select>
     </div>

      <div><button type="submit">Create Note</button></div>
    </form>


    <div className="notes-grid">
       {notes.map((note) => (
           <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
            <button onClick={()=>{handleFav(note.id)}}>
                {note.fav?'Like':'Dislike'}
                </button>
            <button onClick={()=>{handleDelete(note.id)}}>x</button>
           </div>
           <h2 contentEditable='true' onInput={(event)=>{
                console.log(`Triggered`);
                const n = event.target as HTMLInputElement;
                setNotes(notes.map(x=>{
                    if(x.id===note.id){
                        return {...note,title:n.value};
                    } else{
                        return note;
                    }
                console.log(notes);
                }))
           }}> {note.title} </h2>
           <p contentEditable='true'> {note.content} </p>
           <p contentEditable='true'> {note.label} </p>
         </div>
       ))}
     </div>
     
     <div className='favorites-list'>
        <h2>List of Favorites:</h2>
        <ul>
            {notes.map(note => (
                favs.includes(note.id) ? (
                <li key={note.id}>{note.title}</li>
                ) : null 
            ))}
        </ul>
    </div>

     <ToggleTheme/>
   </div>

 );
}

export default App;

