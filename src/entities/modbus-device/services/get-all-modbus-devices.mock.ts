import { ModbusDeviceType } from "../model/modbus-device.schema";

export const getAllModbusDevicesMock = async () => {
  const mockData: ModbusDeviceType[] = new Array(10).fill(0).map((v, i) => ({
    id: String(i),
    ipAddress: "192.168.0." + String(i + 1),
    port: 502,
    registerAddress: 60,
    registerName: "device1",
  }));

  const mockResponse = await new Promise<ModbusDeviceType[]>((res) => {
    setTimeout(() => res(mockData), 950);
  });

  return mockResponse;
};
