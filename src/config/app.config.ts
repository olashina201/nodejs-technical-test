import express, { Application } from "express"
import dotenv from "dotenv"
import { globalErrorHandler } from "../middleware/global-error-handler.middleware";
import connectDB from "./db.confg";

// Load environment variables
dotenv.config();

export class App {
    app: Application

    constructor() {
        this.app = express()
        connectDB()
        this.config()
    }

    config() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(globalErrorHandler)
    }
}