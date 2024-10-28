import {
  ModbusDevicePollType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

type ModbusDeviceProps = {
  deviceData: ModbusDeviceType;
  pollData?: ModbusDevicePollType;
};

export const ModbusDevice = (props: ModbusDeviceProps) => {
  const { deviceData, pollData } = props;

  return (
    <a
      href={"http://" + deviceData.ipAddress}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>
        {deviceData.ipAddress}:{deviceData.port} - {deviceData.registerName} (
        {deviceData.registerAddress})
      </p>
    </a>
  );
};
