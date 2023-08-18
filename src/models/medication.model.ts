import { IMedication } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";

const medicationSchema = new mongoose.Schema<IMedication>({
  droneId: { type: Schema.Types.ObjectId, ref: 'Drone', required: true },
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
});

const MedicationModel = mongoose.model<IMedication>(
  "Medication",
  medicationSchema
);

export default MedicationModel;
