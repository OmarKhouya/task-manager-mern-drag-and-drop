import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { useState } from "react";
import AddTask from "./AddTask";


export default function DroppableComponent({ tasks, type, setRefresh }) {
  const [toggleAddTask, settoggleAddTask] = useState(false);
  return (
    <Droppable droppableId={type}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="main-tasks-group">
            <div className="d-flex justify-content-between">
              <h5 className="text-capitalize">{type}</h5>
              <button
                className="btn"
                onClick={() => settoggleAddTask(!toggleAddTask)}
              >
                <i className="bx bx-plus"></i>
              </button>
            </div>
            <div className="main-add-task">
            {toggleAddTask && <AddTask type={type} setRefresh={setRefresh}/>}
            </div>
            {tasks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard {...item} setRefresh={setRefresh} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
