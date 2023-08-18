import { HttpException } from "../exceptions";
import DroneModel from "../models/drone.model";
import { IDrone } from "../interfaces/model.interface";
import MedicationModel from "../models/medication.model";
import { droneSchemaValidation } from "../validations/drone.validation";

class DroneService {
  public drone: any = DroneModel;
  public medication: any = MedicationModel;

  /*
  |--------------------------------------------------------------------------
  | Add New Drone
  |--------------------------------------------------------------------------
  */
  public async registerNewDrone(body: IDrone): Promise<any> {
    const { error } = droneSchemaValidation.validate(body);

    if (error) {
      throw new HttpException(400, 2001, "REGISTER_DRONE_VALIDATION_ERROR", [error.details[0].message]);
    }

    const data: any = new DroneModel.DroneModel(body);
    data.save();
    return data;
  }
}

export default DroneService;
