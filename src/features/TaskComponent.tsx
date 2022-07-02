import { useEffect, useState } from "react";
import "./TaskComponent.css";
import {
  Col,
  Collapse,
  Row,
} from "react-bootstrap";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useAppDispatch, useAppSelector } from "../shared/redux/store";
import { Task } from "../shared/model/task";
import { fetchTasksAsync, fetchUsersAsync } from "./taskSlice";

export default function TaskComponent() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const dispatch = useAppDispatch();
  const { tasks, users } = useAppSelector((state) => state.task);
  console.log(tasks);
  console.log(users);


  useEffect(() => {
    if(!tasks || tasks.length < 1){
      dispatch(fetchTasksAsync());
    }
   

    
  }, [dispatch, tasks]);


  useEffect(() => {
  
    if(!users || users.length < 1){
      dispatch(fetchUsersAsync());
    }

    
  }, [dispatch, users]);



  function openForm(task?: Task) {
    if (task) {
      setSelectedTask(task);
    }else{
      setSelectedTask(undefined);
    }

    setOpen(!open);
  }


  function closeForm(){
    setSelectedTask(undefined);

    setOpen(false); 
  }

  return (
    <Row>
      <Col xs={6}>
        <Row className="border">
          <Col xs={11}><span className="mx-2">TASKS</span> <span>{tasks.length}</span> </Col>
          
          <Col
            xs={1}
            onClick={() => openForm()}
            aria-controls="task-dropdown"
            aria-expanded={open}
           
            className="border-start border-left-3 d-flex justify-content-center text-center pointer"
          >
            <span className="text-center fs-5 ">+</span>
          </Col>
        </Row>

        <Collapse in={open} className="TaskCollapse">
          <div id="task-dropdown">
            <Row className="TaskCard">
              <TaskForm task={selectedTask} closeForm={closeForm} />
            </Row>
          </div>
        </Collapse>

        <TaskList openForm={openForm} tasks={tasks} />
      </Col>

      <Col></Col>
    </Row>
  );
}
