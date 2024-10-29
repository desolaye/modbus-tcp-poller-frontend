import { ModbusDeviceType } from "../model/modbus-device.schema";

export const getAllModbusDevices = async () => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const response = await fetch(ENV_URL + "/api/ModbusDevices");
    const data = await response.json();

    return data as ModbusDeviceType[];
  } catch (err) {
    throw err;
  }
};
