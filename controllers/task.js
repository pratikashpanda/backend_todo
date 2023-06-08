import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task Added Successfully",
  });
};

export const getMyTasks = async (req, res, next) => {
  const userid = req.user._id;

  const tasks = await Task.find({ user: userid });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTasks = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

   if (!task)
     return res.status(404).json({
       success: False,
       message: "invalid id",
     });

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    messsage: "task updated",
  });
};

export const deleteTasks = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task)
    return res.status(404).json({
      success: False,
      message: "invalid id",
    });

  task.deleteOne();

  res.status(200).json({
    success: true,
    messsage: "task deleted",
  });
};