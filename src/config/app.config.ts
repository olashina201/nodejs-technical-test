import express, { Application } from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "../middleware/global-error-handler.middleware";
import connectDB from "./db.confg";
import { Routes } from "../interfaces/routes.interface";

// Load environment variables
dotenv.config();

export class App {
  app: Application;

  constructor(routes: Routes[]) {
    this.app = express();
    // connectDB();
    this.initializeRoutes(routes);
    this.config();
  }
  
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(globalErrorHandler);
  }
}
