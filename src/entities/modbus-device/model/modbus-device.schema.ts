export type ModbusDeviceType = {
  id: string;
  ipAddress: string;
  port: number;
  registerAddress: number;
  registerName: string;
};

// Backend data
export type ModbusDevicePollDTOType = {
  DeviceId: number;
  IpAddress: string;
  Port: number;
  RegisterAddress: number;
  RegisterName: string;
  Value: number;
  Timestamp: string;
  IsWarning: boolean;
};

// Backend data transformed to frontend
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
