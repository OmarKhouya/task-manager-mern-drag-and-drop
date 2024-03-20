import axios from "axios";
import "boxicons/css/boxicons.min.css";

export default function TaskCard({
  id,
  name,
  description,
  priority,
  duration,
  dateCreation,
  setRefresh,
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/tasks/${id}`
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="main-task-card">
      <div className="d-flex justify-content-between">
        <p>{name}</p>
        <div className="d-flex">
          {priority === "true" && <i className="bx bxs-flag text-danger"></i>}
          <i
            className="bx bx-trash ms-1 main-task-delete"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <div className="task-description">{description}</div>
      <div className="task-duration">
        <i className="bx bx-time"></i> <p>{duration}</p>
      </div>
      <div className="task-creation-date">
        <p>{dateCreation}</p>
        <i className="bx bx-calendar"></i>
      </div>
    </div>
  );
}
