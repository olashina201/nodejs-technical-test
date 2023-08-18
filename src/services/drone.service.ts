import { IDrone } from "../interfaces/model.interface";
import DroneModel from "../models/drone.model";
import { ApplicationError, BadRequestError, HttpException } from "../exceptions";
import { droneSchemaValidation } from "../validations/drone.validation";

class DroneService {
  public drone: any = DroneModel;

  /*
  |--------------------------------------------------------------------------
  | Add New Drone
  |--------------------------------------------------------------------------
  */
  public async registerNewDrone(body: IDrone): Promise<any> {
    const { error } = droneSchemaValidation.validate(body);

    if (error) throw new BadRequestError("REGISTER_DRONE_VALIDATION_ERROR", [error.details[0].message]);
    
    try {
      const data: any = await this.drone.create(body);
      return data;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("REGISTER_DRONE_REQUEST_ERROR", []);
    }
  }
}

export default DroneService;
