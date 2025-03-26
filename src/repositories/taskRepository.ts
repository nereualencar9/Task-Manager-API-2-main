import { sqliteConnection } from "../databases";
import { TaskDataCreate } from "../services/taskServices";
import { TaskDataTypes } from "../validations/taskSchema";

export type CreateTaskDataType = TaskDataCreate & { id: string };
export type UpdateTaskDataType = CreateTaskDataType & { update_at: Date };

export const taskRepository = {
  async createTask({
    id,
    title,
    description,
    date,
    status,
    user_id,
  }: CreateTaskDataType) {
    try {
      const db = await sqliteConnection();

      const query = `
      INSERT INTO taks (id, title, description, date, status, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

      await db.run(query, [id, title, description, date, status, user_id]);

      return { id, title, description, date, status, user_id };
    } catch (error) {
      throw error;
    }
  },

  async getTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const query = `SELECT * FROM tasks WHERE id = ?`;

      const task = await db.get(query, id);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async updateTask({
    id,
    title,
    description,
    date,
    status,
    user_id,
    update_at,
  }: UpdateTaskDataType) {
    try {
      const db = await sqliteConnection();

      const query = `
      UPDATE taks 
      SET title =?, description = ?, date = ?, status = ?, update_at = ?
      WHERE id = ? AND user_id = ?
    `;

      await db.run(query, [
        title,
        description,
        date,
        status,
        update_at,
        id,
        user_id,
      ]);

      return { id, title, description, date, status, user_id, update_at };
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const db = await sqliteConnection();

      const query = `DELETE * FROM tasks WHERE id = ?`;

      await db.run(query, id);

      return id;
    } catch (error) {
      throw error;
    }
  },
};
