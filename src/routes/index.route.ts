import { Router } from "express";
import IndexController from "../controllers/index.controller";
import { Routes } from "../interfaces/routes.interface";

class IndexRoute implements Routes {
  public path = "/";
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.post(`${this.path}drone`, this.indexController.registerDrone);
    this.router.get(`${this.path}drones`, this.indexController.getAllDrone);
    this.router.get(`${this.path}drone/battery/:droneId`, this.indexController.getDroneBatteryLevel);
    this.router.get(`${this.path}drone/loaded/:droneId`, this.indexController.getDroneLoadedMedications);
    this.router.post(`${this.path}drone/load/:droneId`, this.indexController.loadDroneWithMedication);
  }
}

export default IndexRoute;
