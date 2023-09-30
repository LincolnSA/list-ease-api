import { Router } from "express";
import { AuthController } from "../controllers/auth/auth-controller";

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", authController.handle);
