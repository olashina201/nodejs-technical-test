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
  state: { type: String, enum: Object.values(EDroneState), required: true },
});

const DroneLoadingSchema: Schema = new mongoose.Schema<IDroneLoading>({
  droneId: { type: String, required: true },
  medications: [
    {
      medicationId: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

const DroneModel = model<IDrone>("Drone", droneSchema);
const DroneLoadingModel = mongoose.model<IDroneLoading>("DroneLoading", DroneLoadingSchema);

export default { DroneModel, DroneLoadingModel };
