import { EDroneState } from "../interfaces/model.interface";
import { HttpException } from "../exceptions";
import DroneService from "../services/drone.service";
import { NextFunction, Request, Response } from "express";

class IndexController {
  public droneService: DroneService = new DroneService();
  constructor() {}
  
  public index = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        msg: "Hello from App server",
        Time: new Date(),
        status: 'success',
        server: "Express + TS Server",
      });
    } catch (error) {
      next(error);
    }
  };

  public registerDrone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.droneService.registerNewDrone(req.body);
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "REGISTER_DRONE_REQUEST_SUCCESSFUL",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  public loadDroneWithMedication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const droneId: string = req.params.droneId;
      const { name, weight, code, image } = req.body;
  
      const drone = await this.droneService.findDrone(droneId);
      if (!drone) throw new HttpException(400, 2001, "DRONE_NOT_FOUND", []);
      
      if (drone && drone.weight_limit < weight) throw new HttpException(400, 2001, "WEIGHT_BIGGER_THAN_DRONE_CAPACITY", []);

      const payload = {
        name,
        weight,
        code,
        image,
        droneId
      }
      const data = await this.droneService.loadDroneWithMedication(payload);

      // update drone state
      await this.droneService.updateDrone(droneId, { state: drone.battery_level < 25 ? EDroneState.Loaded : EDroneState.Loading, weight_limit: drone.weight_limit - weight });
      
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "REGISTER_DRONE_REQUEST_SUCCESSFUL",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  
  public getAllDrone = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.droneService.findDrones();
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "DRONE_REQUEST_SUCCESSFUL",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  
  public getDroneAvailableForLoading = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.droneService.availableForLoading();
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "DRONE_REQUEST_SUCCESSFUL",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  
  public getDroneBatteryLevel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.droneService.findDrone(req.params.droneId);
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "DRONE_REQUEST_SUCCESSFUL",
        data: {
          battery_level: data.battery_capacity
        },
      });
    } catch (err) {
      next(err);
    }
  }
  
  public getDroneLoadedMedications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.droneService.findMedicationByDrone(req.params.droneId);
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "DRONE_REQUEST_SUCCESSFUL",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default IndexController;
