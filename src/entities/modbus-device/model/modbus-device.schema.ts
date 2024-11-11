export type ModbusDeviceType = {
  id: number;
  ipAddress: string;
  port: number;
  registerAddress: number;
  registerName: string;
  isConfirmed: boolean;
};

export type ModbusDeviceFormType = {
  id: number;
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
