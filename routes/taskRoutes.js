import express from "express";
import {isAuthenticated} from "../middleware/middleware.js";
import * as taskController from "../controller/TaskController.js";

const router = express.Router();

router
    .route("/")
    .post(isAuthenticated,taskController.addTask)
    .get(isAuthenticated, taskController.getTasks);

router
    .route("/:taskId")
    .get(isAuthenticated, taskController.getTask)
    .put(isAuthenticated, taskController.updateTask)
    .delete(isAuthenticated, taskController.deleteTask);


export default router;
