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
  
      const drone = await this.droneService.findDrone(droneId);
      if (!drone) throw new HttpException(400, 2001, "DRONE_NOT_FOUND", []);

      const data = await this.droneService.loadDroneWithMedication(req.body);

      // update drone state
      await this.droneService.updateDrone(droneId, { state: EDroneState.Loaded });
      
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
  
}

export default IndexController;
