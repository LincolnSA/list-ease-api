import { Router } from "express";
import { userRoutes } from "./user-routes";
import { authRoutes } from "./auth-routes";
import { itemRoutes } from "./item-routes";

export const serverRoutes = Router();

serverRoutes.use(userRoutes);
serverRoutes.use(authRoutes);
serverRoutes.use(itemRoutes);
