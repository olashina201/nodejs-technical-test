import { NextFunction, Request, Response } from "express";
import { droneSchemaValidation } from "../validations/drone.validation";
import { IDrone } from "../interfaces/model.interface";
import { BadRequestError, HttpException } from "../exceptions";
import DroneService from "../services/drone.service";

class DroneController {
  public droneService: DroneService = new DroneService();
  constructor() {}

  /*
  |--------------------------------------------------------------------------
  | Add New Drone
  |--------------------------------------------------------------------------
  */
  public async registerDrone(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { body } = req;
      const data = await this.droneService.registerNewDrone(body);
      return res.status(200).json({
        status: 200,
        response_code: 1000,
        message: "REGISTER_DRONE_REQUEST_SUCCESSFUL",
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
      throw new HttpException(400, 2004, "REGISTER_DRONE_REQUEST_ERROR", []);
    }
  }
}

export default DroneController;
