import { useEffect, useState } from "react";
import { Row, Form, Col, Button, FormGroup } from "react-bootstrap";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { agent } from "../shared/api/agent";
import CustomInput from "../shared/CustomInput";
import { Task } from "../shared/model/task";
import { useAppDispatch, useAppSelector } from "../shared/redux/store";
import { formatDate, getTime } from "../shared/util";
import { fetchTasksAsync } from "./taskSlice";
import TimePicker from "react-time-picker";


interface Props {
  task?: Task;
}
export default function TaskForm({ task }: Props) {
  const { users } = useAppSelector((state) => state.task);
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    // resolver: yupResolver(validationSchema),
  });

  const [time, setTime] = useState("10:00");

  useEffect(() => {
    if (task !== undefined) {
      reset(task);
      setTime(getTime(task.task_time));
      console.log("set all");
    }else{
      console.log("reset");
      reset();
    };
  }, [reset, task]);

  async function submitTask(data: FieldValues) {
    const taskData  = data as Task;
    try {
      if(task){
        await agent.Task.updateTask(taskData , task.id).then((response) => {
          console.log(response);
        });
      }else{
        await agent.Task.addTask(taskData).then((response) => {
          console.log(response);
        });
      }
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
          <Col xs={6} className="p-0">
           {/* <CustomInput
              control={control}
              name="task_time"
              defaultValue="15:00"
              placeholder="Time"
              label="Time"
              type="time"
  />*/}
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
          defaultValue=""
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
        </FormGroup>

        <Row className="my-3 mx-3">
          <Col xs={4} lg={6}></Col>
          <Col xs={2} lg={1} className="p-0">
            <span className="">Cancel</span>
          </Col>
          {task ? (
            <Col xs={3} lg={3}>
              <Button variant="success" type="submit">
                Update
              </Button>
            </Col>
          ) : (
            <Col xs={3} lg={3}>
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
