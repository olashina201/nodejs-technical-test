import {
  EDroneState,
  IDrone,
  EDroneModel,
} from "../interfaces/model.interface";
import mongoose from "mongoose";

const droneSchema = new mongoose.Schema<IDrone>({
  serial_number: { type: String, required: true },
  model: { type: String, enum: Object.values(EDroneModel), required: true },
  weight_limit: { type: Number, required: true, max: 500 },
  battery_capacity: { type: Number, required: true, min: 0, max: 100 },
  state: { type: String, enum: Object.values(EDroneState), required: true },
});

const DroneModel = mongoose.model<IDrone>("Drone", droneSchema);

export default DroneModel;
