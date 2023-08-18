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
      // console.log(err);
      next(err);
      // throw new HttpException(400, 2004, "REGISTER_DRONE_REQUEST_ERROR", []);
    }
  }
  
}

export default IndexController;
