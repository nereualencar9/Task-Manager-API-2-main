import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoutes = Router();

taskRoutes.post("/task", authMiddleware, taskControllers.create);
taskRoutes.get("/tasks", authMiddleware, taskControllers.read);
taskRoutes.put("/tasks/:id", authMiddleware, taskControllers.update);
taskRoutes.delete("/tasks/:id", authMiddleware, taskControllers.delete);