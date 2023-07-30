import { api, apiError } from "../helpers/helper.js";
import Task from "../models/Task.js";

export const addTask = async (req, res) => {
  try {
    let data = {
      name: req.body.name,
      description: req.body.description,
      user_id: req.user.id,
    };
    let task = await Task.create(data);
    return api("Task created", res, task, 200);
  } catch (error) {
    return apiError("Some error occurred", res, String(error), 500);
  }
};

export const getTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let task = await Task.findByPk(taskId);

    if (!task) {
      throw "Task not found";
    }

    if (task.user_id !== req.user.id) {
      throw "You are not allowed to access this task";
    }

    return api("Task fetched", res, task, 200);
  } catch (error) {
    return apiError(String(error), res, String(error), 500);
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks = await Task.findAll();

    return api("Tasks fetched", res, tasks, 200);
  } catch (error) {
    return apiError(String(error), res, String(error), 500);
  }
};

export const updateTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let task = await Task.findByPk(taskId);

    if (!task) {
      throw "Task not found";
    }

    if (task.user_id !== req.user.id) {
      throw "You are not allowed to update this task";
    }

    task.name = req.body.name ? req.body.name : task.name;
    task.description = req.body.description
      ? req.body.description
      : task.description;
    task.completed = req.body.completed ? req.body.completed : task.completed;

    await task.save();

    return api("Task updated", res, task, 200);
  } catch (error) {
    return apiError(String(error), res, String(error), 500);
  }
};

export const deleteTask = async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let task = await Task.findByPk(taskId);

    if (!task) {
      throw "Task not found";
    }

    if (task.user_id !== req.user.id) {
      throw "You are not allowed to delete this task";
    }

    await Task.destroy({
      where: {
        id: taskId,
      },
    });

    return api("Task deleted", res, {}, 200);
  } catch (error) {
    return apiError(String(error), res, String(error), 500);
  }
};
