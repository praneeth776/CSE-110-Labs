import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme ,{ ClickCounter } from './hooksExercise';
import React, { useState } from 'react';

export const StickyNotes = () =>{
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
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
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
        setNotes([...notes, createNote]);
        setCreateNote(initialNote);
    }

   function handleTitleChange(id: number, title: string){
       console.log(`Title change initiated for card with key:${id}`);
        setNotes(notes.map(note => {
            if(note.id==id){
                return {...note,title: title}
            } else{
                return note;
            }
        }) as Note[]);
        console.log(notes);
        setFavs(favs);
    }
    function handleContextChange(id: number, content: string ){
        console.log(`Context chnage initiated for card with key:${id}`);
        setNotes(notes.map((note)=>{
            if(note.id==id){
                return {...note,content: content};
            } else{
                return note;
            }
        }) as Note[]);
        console.log(notes);
        setFavs(favs);
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
            placeholder="Note Content"
            onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })}
        required>
        </textarea>
      </div>

<div>
       <select
         onChange={(event) =>
           setCreateNote({ ...createNote, label: event.target.value as Label })}
           data-testid="label"
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
           data-testid='note-element'
           key={note.id}
           className="note-item">
           <div className="notes-header">
            <button onClick={()=>{handleFav(note.id)}}>
                Favorite
                </button>
            <button onClick={()=>{handleDelete(note.id)}}>x</button>
           </div>
           <h2 contentEditable='true' 
                onInput={(event)=>handleTitleChange(note.id,(event.target as HTMLTextAreaElement).value)}
           > {note.title} </h2>
           <p contentEditable='true'
                onInput={(event)=>handleContextChange(note.id,(event.target as HTMLTextAreaElement).value)}
           > {note.content} </p>
           <p > {note.label} </p>
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