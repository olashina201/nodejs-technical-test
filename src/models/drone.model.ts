import {
  EDroneState,
  IDrone,
  EDroneModel,
  IDroneLoading,
} from "../interfaces/model.interface";
import mongoose, { Schema, model } from "mongoose";

const droneSchema: Schema = new Schema<IDrone>({
  serial_number: { type: String, required: true },
  model: { type: String, enum: Object.values(EDroneModel), required: true },
  weight_limit: { type: Number, required: true, max: 500 },
  battery_capacity: { type: Number, required: true, min: 0, max: 100 },
  state: { type: String, enum: Object.values(EDroneState), required: true, default: EDroneState.Idle },
});

const DroneModel = model<IDrone>("Drone", droneSchema);

export default DroneModel;
