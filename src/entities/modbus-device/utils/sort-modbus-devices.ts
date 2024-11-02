import {
  ModbusDevicePollMapType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

export const sortModbusDevices = (
  polls: ModbusDevicePollMapType,
  devices?: ModbusDeviceType[]
) => {
  const array = devices || [];

  const warnings = array.filter(
    (v) => Boolean(polls[v.ipAddress]) && Boolean(polls[v.ipAddress]?.isWarning)
  );

  const pendings = array.filter((v) => !Boolean(polls[v.ipAddress]));

  const normals = array.filter(
    (v) =>
      Boolean(polls[v.ipAddress]) && !Boolean(polls[v.ipAddress]?.isWarning)
  );

  return [...warnings, ...pendings, ...normals];
};
