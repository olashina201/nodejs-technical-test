import { Document, Types } from "mongoose";

export enum EDroneModel {
  Lightweight = "Lightweight",
  Middleweight = "Middleweight",
  Cruiserweight = "Cruiserweight",
  Heavyweight = "Heavyweight",
}

export enum EDroneState {
  Idle = "IDLE",
  Loading = "LOADING",
  Loaded = "LOADED",
  Delivering = "DELIVERING",
  Delivered = "DELIVERED",
  Returning = "RETURNING",
}
export interface IDrone extends Document {
  serial_number: string;
  model: EDroneModel;
  weight_limit: number;
  battery_capacity: number;
  state: EDroneState;
}

export interface IMedication extends Document {
  droneId: Types.ObjectId | string,
  name: string;
  weight: number;
  code: string;
  image: string;
}

export interface IDroneLoading extends Document {
  droneId: string;
  medications: {
    medicationId: string;
    quantity: number;
  }[];
}