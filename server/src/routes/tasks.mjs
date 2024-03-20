import { Router } from "express";
import { Task } from "../database/schemas/task.mjs";

const router = Router();

router.get("/api/tasks", async (request, response) => {
  const { filter, value, filter1, value1 } = request.query;
  if (filter && value && filter1 && value1) {
    const filteredTasks = await Task.find({
      [filter]: value,
      [filter1]: value1,
    });
    return response.status(200).send(filteredTasks);
  }
  if (filter && value) {
    const filteredTasks = await Task.find({ [filter]: value });
    return response.status(200).send(filteredTasks);
  }
  const allTasks = Task.find();
  return response.status(200).send(allTasks);
});

router.patch("/api/tasks/:id", async (request, response) => {
  const {
    body: { doing, done },
    params: { id },
  } = request;
  try {
    const parsedId = parseInt(id);
    const findTask = await Task.findOne({ id: parsedId });
    if (!findTask) throw new Error("Task not Found");
    await Task.updateOne({ id: id }, { doing: doing, done: done });
    return response.status(201).send({ message: "Task updated successfully" });
  } catch (err) {
    console.log(err);
    return response.status(400).send({ error: err.message });
  }
});

router.post("/api/tasks", async (request, response) => {
  const { body } = request;
  try {
    const tasksCount = await Task.countDocuments();
    const getDate = new Date();
    const newTaskData = {
      ...body,
      id: `${Math.floor(Math.random() * 1000000)}`,
      dateCreation: `${getDate.getDate()}-${getDate.getMonth()}-${getDate.getFullYear()}`,
    };
    const newTask = new Task(newTaskData);
    await newTask.save();
    return response.status(201).send({ message: "Task created successfully" });
  } catch (err) {
    console.log(err);
    return response.status(400).send({ error: err.message });
  }
});

router.delete("/api/tasks/:id", async (request, response) => {
  const {
    params: { id },
  } = request;
  try {
    const parsedId = parseInt(id);
    const result = await Task.deleteOne({ id: parsedId });
    if (result.deletedCount === 1) {
      return response
        .status(200)
        .send({ message: "Task deleted successfully" });
    } else {
      throw new Error({ message: "Task not Found" });
    }
  } catch (err) {
    console.log(err);
    response.status(400).send({ error: err.message });
  }
});

export default router;
