import express from "express";
import {isAuthenticated} from "../middleware/middleware.js";
import * as authController from "../controller/AuthController.js";
import * as userController from "../controller/UserController.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, authController.register);

router.route("/signIn").post(isAuthenticated, authController.signin);

router
    .route("/")
    .get(isAuthenticated, userController.getUsers)
    .post(isAuthenticated, userController.postUser);

router
    .route("/:id")
    .get(isAuthenticated, userController.getUser)
    .put(isAuthenticated, userController.updateUser)
    .delete(isAuthenticated, userController.deleteUser);


export default router;