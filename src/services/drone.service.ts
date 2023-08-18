import { HttpException } from "../exceptions";
import DroneModel from "../models/drone.model";
import { IDrone, IMedication } from "../interfaces/model.interface";
import MedicationModel from "../models/medication.model";
import { droneSchemaValidation, loadMedicationValidation, updateDroneSchemaValidation } from "../validations/drone.validation";
import mongoose, { Types } from "mongoose";

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

    const data: any = new DroneModel(body);
    data.save();
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Find Drone
  |--------------------------------------------------------------------------
  */
  public async findDrone(droneId: string): Promise<any> {
    const data: any = await DroneModel.findById(new mongoose.Types.ObjectId(droneId)).lean();
    console.log(data)
    return data;
  }
  
  /*
  |--------------------------------------------------------------------------
  | Find Drone
  |--------------------------------------------------------------------------
  */
  public async findMedicationByDrone(droneId: string): Promise<any> {
    const data: any = await MedicationModel.find({ droneId }).lean();
    return data;
  }
  
  /*
  |--------------------------------------------------------------------------
  | Find Drone
  |--------------------------------------------------------------------------
  */
  public async availableForLoading(): Promise<any> {
    const data: any = await DroneModel.find({ state: { $in: ['IDLE', 'LOADING'] } }).lean();
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Find All Drones
  |--------------------------------------------------------------------------
  */
  public async findDrones(): Promise<any> {
    const data: any = await DroneModel.find({}).lean();
    console.log(data)
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Update Drone State
  |--------------------------------------------------------------------------
  */
  public async updateDrone(droneId: string, payload: Partial<IDrone>): Promise<any> {

    const { error } = updateDroneSchemaValidation.validate(payload);

    if (error) throw new HttpException(400, 9002, 'BILLING_ADDRESS_VALIDATION_ERROR', [error.details[0].message]);

    const drone = await this.drone.findById(droneId);
    if (!drone) throw new HttpException(400, 1003, 'DRONE_NOT_FOUND');

    const updatedData = await DroneModel.findByIdAndUpdate(droneId, payload, {
      new: true,
    });

    if (!updatedData) throw new HttpException(400, 9009, 'BILLING_ADDRESS_REQUEST_ERROR');

    return updatedData;
  }
  
  /*
  |--------------------------------------------------------------------------
  | Load Drone With Medication
  |--------------------------------------------------------------------------
  */
  public async loadDroneWithMedication(body: IMedication | any): Promise<any> {
    const { error } = loadMedicationValidation.validate(body);

    if (error) {
      throw new HttpException(400, 2001, "REGISTER_DRONE_VALIDATION_ERROR", [error.details[0].message]);
    }

    const data: any = new MedicationModel(body);
    data.save();
    return data;
  }
}

export default DroneService;
