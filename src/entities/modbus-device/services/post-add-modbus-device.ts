import { ModbusDeviceType } from "../model/modbus-device.schema";

export const postAddModbusDevice = async (device: ModbusDeviceType) => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;
    await fetch(ENV_URL + "/api/ModbusDevices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
  } catch (err) {
    throw err;
  }
};
