import { apiInstance } from "@/shared/api/api-instance";

export const getAllModbusDevices = async () => {
  const response = await apiInstance.get("/ModbusDevices");
  return response.data;
};
