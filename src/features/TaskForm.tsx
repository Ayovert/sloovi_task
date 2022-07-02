import { useEffect, useState } from "react";
import { Row, Form, Col, Button, FormGroup } from "react-bootstrap";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { agent } from "../shared/api/agent";
import CustomInput from "../shared/CustomInput";
import { Task } from "../shared/model/task";
import { useAppDispatch, useAppSelector } from "../shared/redux/store";
import { formatDate, getTime, mapTaskRequest } from "../shared/util";
import { fetchTasksAsync } from "./taskSlice";
import TimePicker from "react-time-picker";
import { ReactComponent as DeleteIcon } from "../features/assets/delete.svg";


interface Props {
  task?: Task;
  closeForm:() => void; 
}
export default function TaskForm({ task, closeForm }: Props) {
  const { users } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "all"
    // resolver: yupResolver(validationSchema),
  });

  const [time, setTime] = useState("10:00");

  useEffect(() => {
    if (task !== undefined) {
      reset(task);
      setTime(getTime(task.task_time));

    }else{
      reset({task:undefined});
    };

    setValue("assigned_user" , users[0]?.name);
  }, [reset, task, setValue, users]);



  function handleDeleteTask(){
   if(task && task.id){
      agent.Task.deleteTask(task.id)
      .then((response) => {
        
        reset({task: undefined});
        closeForm();
        dispatch(fetchTasksAsync());
      })
      .catch((error) => {
          console.log(error)
      })
    }
}

  async function submitTask(data: FieldValues) {
    const taskData   = data as Task;
    const request = mapTaskRequest(taskData);
    try {
      if(task && task.id){
        await agent.Task.updateTask(request , task.id).then((response) => {
          console.log(response);
          reset();
          closeForm();
        });
      }else{
        await agent.Task.addTask(request).then((response) => {
          console.log(response);
          reset();
          closeForm();
        });
      }

      dispatch(fetchTasksAsync());

    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitTask)}>
        <CustomInput
          control={control}
          name="task_msg"
          defaultValue=""
          placeholder="Enter task description"
          label="Task Description"
        />

        <Row className="d-flex justify-content-center align-items-center ">
          <Col xs={6}>
            <CustomInput
              control={control}
              name="task_date"
              defaultValue={new Date()}
              placeholder={formatDate(new Date())}
              label="Date"
              type="date"
            />
          </Col>
          <Col></Col>
          <Col xs={5} className="m-2 d-flex flex-column">
          
  <label className="mb-2">Time</label>
            <TimePicker
            className="mb-3"
            name="task_time"
              onChange={(e) => setTime(e.toLocaleString())}
              value={time}
            />
        
          </Col>
          

          
        </Row>

        <CustomInput
          control={control}
          name="assigned_user"
          placeholder="Assign User"
          label="Assign User"
          type="select"
          options={users}
        />

        <FormGroup className="d-none">
          <Controller
            control={control}
            name="time_zone"
            defaultValue={-60}
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}
                value={-60}
                placeholder="Time zone"
              />
            )}
          />
          <Controller
            control={control}
            name="is_completed"
            defaultValue={0}
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}
                value={0}
                placeholder="Is Completed"
              />
            )}
          />
        </FormGroup>
      

        <Row className="my-3 w-100">
          {task && <Col xs={1} className="pointer" onClick={() => handleDeleteTask()}>
          <DeleteIcon/>
          </Col> }

          <Col xs={8}></Col>

         
          <Col xs={2} lg={1} className="p-0 pointer"
          onClick={()=>{closeForm()}}
          >
            <span className="">Cancel</span>
          </Col>
          {task ? (
            <Col xs={3} lg={2}>
              <Button variant="success" type="submit">
                Update
              </Button>
            </Col> 
          ) : (
            <Col xs={3} lg={1}>
              <Button variant="success" type="submit">
                Save
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    </>
  );
}

//disabled={!formState.isDirty}
