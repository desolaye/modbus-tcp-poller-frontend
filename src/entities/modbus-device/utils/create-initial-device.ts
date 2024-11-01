import {
  ModbusDeviceFormType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

export const createInitialDevice = (
  device?: ModbusDeviceType
): ModbusDeviceFormType => {
  return {
    id: device?.id || 0,
    ipAddress: device?.ipAddress || "",
    port: device?.port ? String(device.port) : "",
    registerAddress: device?.registerAddress
      ? String(device.registerAddress)
      : "",
    registerName: device?.registerName || "",
  };
};
