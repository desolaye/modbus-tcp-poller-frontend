import {
  ModbusDevicePollMapType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

export const sortModbusDevices = (
  polls: ModbusDevicePollMapType,
  devices?: ModbusDeviceType[]
) => {
  const array = devices || [];

  const warnings = [];
  const confirmWarnings = [];
  const pendings = [];
  const normals = [];

  for (const elem of array) {
    const poll = polls[elem.ipAddress];

    if (!Boolean(poll)) pendings.push(elem);

    if (Boolean(poll)) {
      if (poll.isWarning && elem.isConfirmed) confirmWarnings.push(elem);
      else if (poll.isWarning && !elem.isConfirmed) warnings.push(elem);
      else normals.push(elem);
    }
  }

  return [...warnings, ...confirmWarnings, ...pendings, ...normals];
};
