import { CreateUserDataType } from "./userRepository";

const users = [
  {
    id: "1",
    name: "João",
    email: "user1@email.com",
    password: "$2b$10$QeSu2dkKZzxr0uq2EFgfOOHwHM1v12N7GP1bNknpPT8lY.dEIDWyC",
  },

  {
    id: "2",
    name: "João",
    email: "user2@email.com",
    password: "$2b$10$QeSu2dkKZzxr0uq2EFgfOOHwHM1v12N7GP1bNknpPT8lY.dEIDWyC",
  },
] as CreateUserDataType[];

export const userRepositoryInMemory = {
  async create({ id, name, email, password }: CreateUserDataType) {
    try {
      users.push({ id, name, email, password });

      console.log(users);

      return users[users.length - 1];
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    try {
      const user = users.find((user) => user.email === email);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserByID(id: string) {
    try {
      const user = users.find((user) => user.id === id);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
