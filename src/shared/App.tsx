import './App.css';
import TaskComponent from '../features/TaskComponent';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import { fetchTasksAsync } from '../features/taskSlice';
import TaskList from '../features/TaskList';

function App() {
  
  return (
    <div className="container mt-5">
      <TaskComponent/>

    </div>
  );
}

export default App;
