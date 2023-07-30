import express from "express";
import { databaseLoader } from "./helpers/databaseLoader.js";
import userRouter from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express()

databaseLoader()

app.use('/users', userRouter);
app.use('/tasks', taskRoutes);

app.listen(3001,()=>{
    console.log('server is running on 3002');
})


