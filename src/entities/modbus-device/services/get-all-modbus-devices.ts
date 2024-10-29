import { apiInstance } from "@/shared/api/api-instance";
import { ModbusDeviceType } from "../model/modbus-device.schema";

export const getAllModbusDevices = async () => {
  const response = await apiInstance.get<ModbusDeviceType[]>(
    "/api/ModbusDevices"
  );

  return response.data;
};
