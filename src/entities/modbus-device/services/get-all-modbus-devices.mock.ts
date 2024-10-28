import { ModbusDeviceType } from "../model/modbus-device.schema";

export const getAllModbusDevicesMock = async () => {
  const mockData: ModbusDeviceType[] = [
    {
      id: "0",
      ipAddress: "192.168.0.1",
      port: 502,
      registerAddress: 60,
      registerName: "device1",
    },
    {
      id: "1",
      ipAddress: "192.168.0.2",
      port: 502,
      registerAddress: 60,
      registerName: "device2",
    },
    {
      id: "2",
      ipAddress: "192.168.0.3",
      port: 502,
      registerAddress: 60,
      registerName: "device3",
    },
  ];

  const mockResponse = await new Promise<ModbusDeviceType[]>((res) => {
    setTimeout(() => res(mockData), 450);
  });

  return mockResponse;
};
