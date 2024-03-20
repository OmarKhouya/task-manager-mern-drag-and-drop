import SideBar from "../Template/sideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import "./main.css";
import DroppableComponent from "../Template/Droppable";

export default function Main() {
  const [comingTasks, setComingTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comingResponse, doingResponse, doneResponse] = await Promise.all(
          [
            axios.get(
              "http://localhost:3001/api/tasks?filter=doing&value=false&filter1=done&value1=false"
            ),
            axios.get(
              "http://localhost:3001/api/tasks?filter=doing&value=true"
            ),
            axios.get("http://localhost:3001/api/tasks?filter=done&value=true"),
          ]
        );
        setComingTasks(comingResponse.data);
        setDoingTasks(doingResponse.data);
        setDoneTasks(doneResponse.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleDragDrop = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const draggedTask =
      comingTasks.find((task) => task.id === draggableId) ||
      doingTasks.find((task) => task.id === draggableId) ||
      doneTasks.find((task) => task.id === draggableId);

    if (!draggedTask) return;

    switch (destination.droppableId) {
      case "coming":
        axios
          .patch(`http://localhost:3001/api/tasks/${draggableId}`, {
            doing: "false",
            done: "false",
          })
          .then(setRefresh((prev) => !prev));
        break;
      case "doing":
        axios
          .patch(`http://localhost:3001/api/tasks/${draggableId}`, {
            doing: "true",
            done: "false",
          })
          .then(setRefresh((prev) => !prev));
        break;
      case "done":
        axios
          .patch(`http://localhost:3001/api/tasks/${draggableId}`, {
            doing: "false",
            done: "true",
          })
          .then(setRefresh((prev) => !prev));
        break;
      default:
        break;
    }
  };

  return (
    <div className="main-tasks-parent">
      <DragDropContext onDragEnd={handleDragDrop}>
        <DroppableComponent
          tasks={comingTasks}
          type="coming"
          setRefresh={setRefresh}
        />
        <DroppableComponent
          tasks={doingTasks}
          type="doing"
          setRefresh={setRefresh}
        />
        <DroppableComponent
          tasks={doneTasks}
          type="done"
          setRefresh={setRefresh}
        />
      </DragDropContext>
    </div>
  );
}
