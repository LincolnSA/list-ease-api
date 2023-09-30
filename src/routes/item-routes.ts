import { Router } from "express";
import { AuthenticatedMiddleware } from "../middlewares/authenticated-middleware";
import { CreateItemController } from "../controllers/item/create-item-controller";
import { DeleteItemController } from "../controllers/item/delete-item-controller";
import { ListItemController } from "../controllers/item/list-item-controller";
import { UpdateItemController } from "../controllers/item/update-item-controller";

export const itemRoutes = Router();

const authenticatedMiddleware = new AuthenticatedMiddleware();
const createItemController = new CreateItemController();
const deleteItemController = new DeleteItemController();
const listItemController = new ListItemController();
const updateItemController = new UpdateItemController();

itemRoutes.post("/items", authenticatedMiddleware.handle, createItemController.handle);
itemRoutes.delete("/items/:id", authenticatedMiddleware.handle, deleteItemController.handle);
itemRoutes.get("/items", authenticatedMiddleware.handle, listItemController.handle);
itemRoutes.patch("/items/:id", authenticatedMiddleware.handle, updateItemController.handle);