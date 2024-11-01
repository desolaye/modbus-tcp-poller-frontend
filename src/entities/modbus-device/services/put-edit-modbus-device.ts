import { ModbusDeviceType } from "../model/modbus-device.schema";

export const putEditModbusDevice = async (
  device: ModbusDeviceType,
  deviceId: number
) => {
  try {
    const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;

    await fetch(ENV_URL + "/api/ModbusDevices/" + deviceId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
  } catch (err) {
    throw err;
  }
};
