import { apiInstance } from "@/shared/api/api-instance";
import { ModbusDeviceType } from "../model/modbus-device.schema";

export const postAddModbusDevice = async (device: ModbusDeviceType) => {
  const response = await apiInstance.post("/ModbusDevice", device);
  return response.data;
};
