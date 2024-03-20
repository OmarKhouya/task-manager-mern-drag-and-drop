import axios from "axios";
import "boxicons/css/boxicons.min.css";
import { useEffect, useState } from "react";

export default function TaskCard({ type, setRefresh }) {
  const [changedData, setchangedData] = useState({});
  const [dataToSend, setDataToSend] = useState();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (checked)
      setchangedData((prev) => {
        return { ...prev, [name]: type === "checkbox" ? "true" : value };
      });
    else
      setchangedData((prev) => {
        return { ...prev, [name]: type === "checkbox" ? "false" : value };
      });
  };
  const handleAddTask = () => {
    switch (type) {
      case "coming":
        setDataToSend({
          ...changedData,
          doing: "false",
          done: "false",
          dateCreation: new Date(),
        });
        break;
      case "doing":
        setDataToSend({
          ...changedData,
          doing: "true",
          done: "false",
          dateCreation: new Date(),
        });
        break;
      case "done":
        setDataToSend({
          ...changedData,
          doing: "false",
          done: "true",
          dateCreation: new Date(),
        });
        break;
      default:
        break;
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post("http://localhost:3001/api/tasks", dataToSend)
          .then(() => {
            setRefresh((prev) => !prev);
          })
          .catch((error) => {
            console.error("Error adding task:", error);
          });
      }}
      className="main-task-card"
    >
      <div className="">
        <input
          type="text"
          placeholder="task name"
          name="name"
          onChange={handleChange}
        />
        <div className="d-flex justify-content-between mt-3">
          <span className="text-muted">priority</span>
          <input
            type="checkbox"
            name="priority"
            id="task-priority-checkbox"
            className="w-25"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="task-description mt-3">
        <input
          type="text"
          placeholder="task description"
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="task-duration">
        <i className="bx bx-time me-1"></i>
        <input
          type="text"
          placeholder="task duration"
          className="w-50"
          name="duration"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-dark float-end mt-2"
        onClick={handleAddTask}
      >
        add task
      </button>
    </form>
  );
}
