import "dotenv/config";
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import "express-async-errors";
import cors from "cors";

import { prisma } from "./prisma/prisma-client";
import { serverRoutes } from "./routes/server-routes";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler-middleware";

const PORT = process.env.PORT || 3333;
const server = express();
const httpServer = createServer(server);
export const socketServer = new Server(httpServer);

const execute = async () => {
  try {
    server.use(cors());
    server.use(express.json());
    server.use(serverRoutes);
    server.use(ErrorHandlerMiddleware.handle);

    await prisma.$connect();

    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

execute();
