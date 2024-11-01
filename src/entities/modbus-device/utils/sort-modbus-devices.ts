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
    (v) => Boolean(polls[v.id]) && Boolean(polls[v.id]?.isWarning)
  );

  const pendings = array.filter((v) => !Boolean(polls[v.id]));

  const normals = array.filter(
    (v) => Boolean(polls[v.id]) && !Boolean(polls[v.id]?.isWarning)
  );

  return [...warnings, ...pendings, ...normals];
};
