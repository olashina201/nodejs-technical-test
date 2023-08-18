import Joi from "joi";
import { EDroneModel, EDroneState } from "../interfaces/model.interface";

// Drone validation schema
export const droneSchema = Joi.object({
  serial_number: Joi.string().max(100).required(),
  model: Joi.string()
    .valid(...Object.values(EDroneModel))
    .required(),
  weight_limit: Joi.number().max(500).required(),
  battery_capacity: Joi.number().min(0).max(100).required(),
  state: Joi.string()
    .valid(...Object.values(EDroneState))
    .required(),
});

// Medication validation schema
export const medicationSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  weight: Joi.number().required(),
  code: Joi.string()
    .regex(/^[A-Z0-9_]+$/)
    .required(),
  image: Joi.string().required(),
});
