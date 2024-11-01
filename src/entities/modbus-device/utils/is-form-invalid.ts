import { ModbusDeviceFormType } from "../model/modbus-device.schema";

export const isFormInvalid = (device: ModbusDeviceFormType) => {
  const {
    ipAddress,
    port = "502",
    registerAddress = "60",
    registerName,
  } = device;

  const isNaN = (x: string) => Number.isNaN(Number(x));

  if (!ipAddress || ipAddress.split(".").length !== 4) return true;
  if (isNaN(port)) return true;
  if (isNaN(registerAddress)) return true;
  if (!registerName) return true;

  return false;
};
