import { Col, Row } from "react-bootstrap";
import { ReactComponent as NotificationIcon } from "../features/assets/notification.svg";
import { ReactComponent as CheckIcon } from "../features/assets/check.svg";
import { ReactComponent as PencilIcon } from "../features/assets/pencil.svg";
import { useAppSelector } from "../shared/redux/store";
import { Task } from "../shared/model/task";

interface Props{
  openForm:(task? : Task) => void;
  tasks? : Task[];
}
export default function TaskList({openForm}:Props) {

  const {tasks} = useAppSelector((state) => state.task);





  return (
    <Row>
      {tasks?.map((item) => {
        return(
          <div className="border bg-white" key={item.id}>
        <Row className="">
          <Col xs={3} >
            <img
              alt="user-img"
              height={40}
              src="https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Col>

          <Col xs={6}>
            <Col xs={12}>{item.task_msg}</Col>
            <Col xs={12}>{item.task_date.toString()}</Col>
          </Col>

          <Col xs={3}>
            <Row>
              <Col xs={4} onClick={() => openForm(item)}>
                <PencilIcon  />
              </Col>
              <Col xs={4}>
                <NotificationIcon />
              </Col>
              <Col xs={4}>
                <CheckIcon />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
        );
      })}
    {/**
     * {tasks?.map((item) => {
        return(
          <div className="border bg-white" key={item.assigned_user}>
        <Row className="">
          <Col xs={3} >
            <img
              alt="user-img"
              height={40}
              src="https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Col>

          <Col xs={6}>
            <Col xs={12}>Follow Up</Col>
            <Col xs={12}>2/4/2020</Col>
          </Col>

          <Col xs={3}>
            <Row>
              <Col xs={4}>
                <PencilIcon />
              </Col>
              <Col xs={4}>
                <NotificationIcon />
              </Col>
              <Col xs={4}>
                <CheckIcon />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
        );
      })}
     */}  
     
    </Row>
  );
}
