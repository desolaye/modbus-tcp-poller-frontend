import {
  ModbusDeviceFormType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

export const formDeviceToModbusDevice = (
  device: ModbusDeviceFormType
): ModbusDeviceType => {
  return {
    ...device,
    port: Number(device.port || "502"),
    registerAddress: Number(device.registerAddress || "60"),
  };
};
