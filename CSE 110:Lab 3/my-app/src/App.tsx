import './App.css';
import { ToDoList } from './toDoList';
import { StickyNotes } from './stickyNotes';
import { Route,Routes } from 'react-router-dom';
import NavBar from './navbar';

const App = () => {
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<StickyNotes />} />
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </div>
    );
   };
   export default App;