import { Router } from "express";
import { CreateUserController } from "../controllers/user/create-user-controller";
import { FindByIdUserController } from "../controllers/user/find-by-id-user-controller";
import { AuthenticatedMiddleware } from "../middlewares/authenticated-middleware";

export const userRoutes = Router();

const authenticatedMiddleware = new AuthenticatedMiddleware();
const createUserController = new CreateUserController();
const findByIdUserController = new FindByIdUserController();

userRoutes.post("/users", createUserController.handle);

userRoutes.get(
  "/users",
  authenticatedMiddleware.handle,
  findByIdUserController.handle
);
