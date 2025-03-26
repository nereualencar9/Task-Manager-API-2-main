import { randomUUID } from "node:crypto";
import { AppError } from "../errors/appError";
import { TaskDataTypes } from "../validations/taskSchema";
import {
  CreateTaskDataType,
  UpdateTaskDataType,
} from "../repositories/taskRepository";
import { PaginationDataTypes } from "../validations/paginationSchema";

export type TaskDataCreate = TaskDataTypes & { user_id: string, id: string };
export type UserTaskPagination = PaginationDataTypes & { userID: string };

export type TaskRepositoryTypes = {
  createTask(data: TaskDataCreate): Promise<TaskDataTypes | undefined>;
  getTaskByID(id: string): Promise<Partial<CreateTaskDataType> | undefined>;
  getTasks(data: UserTaskPagination): Promise<CreateTaskDataType[] | undefined>;
  updateTask(data: UpdateTaskDataType): Promise<UpdateTaskDataType | undefined>;
  deleteTaskByID(id: string): Promise<{ id: string } | undefined>;
};

export const userServices = {
  async create(
    { title, description, date, status, user_id }: TaskDataCreate,
    repository: TaskRepositoryTypes
  ) {
    try {
      if (new Date(date) < new Date()) {
        throw new AppError("date cannot be before the current time", 400);
      }

      const taskCreated = await repository.createTask({
        id: randomUUID(),
        title,
        description,
        date,
        status: status || "pending",
        user_id,
      });

      return taskCreated;
    } catch (error) {
      throw error;
    }
  },

  async read(
    { userID, limit, offset, filter }: UserTaskPagination,
    repository: TaskRepositoryTypes
  ) {
    try {
      if (!limit || !offset || !filter) {
        throw new AppError("please inform limit, offset and filter", 404);
      }

      const userTasks = await repository.getTasks({
        userID,
        limit,
        offset,
        filter,
      });

      return userTasks;
    } catch (error) {
      throw error;
    }
  },
};
