import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import DroneController from "../controllers/drone.controller";

class DroneRoute implements Routes {
  public path = "/drone";
  public router = Router();
  public droneController = new DroneController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.droneController.registerDrone);
  }
}

export default DroneRoute;
