import { Request, Response, NextFunction } from "express";
import { UUIDSchema } from "../validations/UUIDSchema";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";
import { paginationSchema } from "../validations/paginationSchema";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const { id } = UUIDSchema().parse({ id: req.userID });

      const taskCreated = await taskServices.create(
        { title, description, date, status, user_id: id },
        taskRepository
      );

      res
        .status(201)
        .json({ message: "task created successfully", taskCreated });
    } catch (error) {
      next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset, filter } = paginationSchema.parse(req.query);
      const { id } = UUIDSchema().parse({ id: req.userID });

      const userTasks = await taskServices.read({
        id,
        title,
        description,
        date,
        status,
        user_id: id,
      });
      res
        .status(200)
        .jason({ message: "task created successfully", userTasks });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const { id } = UUIDSchema().parse({ id: req.params });
      const userID = UUIDSchema().parse({ id: req.userID });

      if (status) {
        const taskUpdated = await taskServices.update(
          id,
          { title, description, date, status, user_id: id },
          taskRepository
        );
      }
      res
        .status(201)
        .json({ message: "task update successfully", taskUpdated });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const { id } = UUIDSchema().parse({ id: req.userID });

      const taskDeleted = await taskServices.delete(taskRepository);

      res.status(200).json({ message: "task deleted", taskDeleted });
    } catch (error) {
      next(error);
    }
  },
};
