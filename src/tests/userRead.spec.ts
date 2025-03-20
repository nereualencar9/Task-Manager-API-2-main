import { expect, test, describe } from "vitest";
import { userRepositoryInMemory } from "../repositories/userResitoryInMemory";
import { userServices } from "../services/userServices";

describe("test read user function", async () => {
  test("should read user by ID", async () => {
    const user = await userServices.read("1", userRepositoryInMemory);

    console.log(user, "aaaa");

    expect(user).toBeDefined();
    expect(user).toHaveProperty("id");
    expect(user).not.toHaveProperty("password");
  });

  test("should not found user", async () => {
    try {
      await userServices.read("fakeID", userRepositoryInMemory);
    } catch (error: any) {
      expect(error.message).toBe("user not found");
    }
  });
});
