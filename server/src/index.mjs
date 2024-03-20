import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tasksRouter from "./tasks.mjs";
console.clear();

const app = express();

mongoose
  .connect("mongodb://localhost:27017/task-manager")
  .then(() => console.log("connect to database!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "12THIS21A31SEC9RET",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(tasksRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`this app is listening on Port ${PORT}`);
});
