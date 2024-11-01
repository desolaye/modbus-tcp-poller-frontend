export type ModbusDeviceType = {
  id: number;
  ipAddress: string;
  port: number;
  registerAddress: number;
  registerName: string;
};

export type ModbusDeviceFormType = {
  id: string;
  ipAddress: string;
  port: string;
  registerAddress: string;
  registerName: string;
};

export type ModbusDevicePollType = {
  deviceId: number;
  ipAddress: string;
  port: number;
  registerAddress: number;
  registerName: string;
  value: number;
  timestamp: string;
  isWarning: boolean;
};

export type ModbusDevicePollMapType = {
  [key: string]: ModbusDevicePollType;
};
