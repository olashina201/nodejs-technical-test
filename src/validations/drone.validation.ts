import Joi from "joi";
import { EDroneModel, EDroneState } from "../interfaces/model.interface";

// Drone validation schema
export const droneSchemaValidation = Joi.object({
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

// Update Drone validation schema
export const updateDroneSchemaValidation = Joi.object({
  serial_number: Joi.string().max(100),
  model: Joi.string().valid(...Object.values(EDroneModel)),
  weight_limit: Joi.number().max(500),
  battery_capacity: Joi.number().min(0).max(100),
  state: Joi.string().valid(...Object.values(EDroneState)),
}).min(1);

// Medication validation schema
export const loadMedicationValidation = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z0-9\-_]+$/)
    .required(),
  weight: Joi.number().required(),
  code: Joi.string()
    .regex(/^[A-Z0-9_]+$/)
    .required(),
  image: Joi.string().required(),
});
