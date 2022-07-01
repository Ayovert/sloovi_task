import { useEffect, useState } from "react";
import "./TaskComponent.css";
import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import {
  Controller,
  FieldValues,
  useForm,
  useFormContext,
} from "react-hook-form";
import { agent } from "../shared/api/agent";
import DatePicker from "react-date-picker";
import { formatDate } from "../shared/util";
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

  console.log(users);
  useEffect(() => {
    dispatch(fetchTasksAsync()).then((response) => {
      console.log(response);
    });

    dispatch(fetchUsersAsync()).then((response) => {
      console.log(response);
    });
  }, [dispatch]);

  function openForm(task?: Task) {
    if (task) {
      setSelectedTask(task);
    }

    setOpen(!open);
  }

  function newForm() {
    console.log("new");
    setSelectedTask(undefined);

    setOpen(!open);
  }

  return (
    <Row>
      <Col xs={6}>
        <Row className="border p-2">
          <Col xs={11}>TASKS {tasks.length}</Col>
          <Col
            xs={1}
            onClick={() => newForm()}
            aria-controls="task-dropdown"
            aria-expanded={open}
            style={{
              cursor: "pointer",
            }}
            className="border-start border-left-3 d-flex justify-content-center text-center"
          >
            <span className="text-center">+</span>
          </Col>
        </Row>

        <Collapse in={open} className="TaskCollapse">
          <div id="task-dropdown">
            <Row className="TaskCard">
              <TaskForm task={selectedTask} />
            </Row>
          </div>
        </Collapse>

        <TaskList openForm={openForm} tasks={tasks} />
      </Col>

      <Col></Col>
    </Row>
  );
}
