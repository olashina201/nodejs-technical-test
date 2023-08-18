import DroneModel from '../models/drone.model';

export const checkBatteryAndLog = async () => {
  try {
    const drones = await DroneModel.find().lean();

    for (const drone of drones) {
      const batteryLog = {
        droneId: drone._id,
        batteryLevel: drone.battery_capacity,
        timestamp: new Date(),
      };

      console.log(batteryLog);
    }
  } catch (error) {
    console.error('Error checking battery levels:', error);
  }
};
  