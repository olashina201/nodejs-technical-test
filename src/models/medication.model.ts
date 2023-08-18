import { IMedication } from "../interfaces/model.interface";
import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema<IMedication>({
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
