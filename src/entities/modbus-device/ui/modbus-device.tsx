import { ErrorIcon } from "@/shared/ui/error-icon";
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

  // const isError = Boolean(pollData?.isWarning);
  const isError = deviceData.id === "1";

  const color = isError ? "#eee" : undefined;
  const classes = `grid_row body_row${isError ? " error_row" : ""}`;

  return (
    <a
      className={classes}
      href={"http://" + deviceData.ipAddress}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p style={{ color }}>{deviceData.id}</p>
      <p style={{ color }}>{deviceData.ipAddress}</p>
      <p style={{ color }}>{deviceData.port}</p>
      <p style={{ color }}>{deviceData.registerName}</p>
      <p style={{ color }}>{deviceData.registerAddress}</p>

      {isError && (
        <div style={{ width: 24, height: 24 }}>
          <ErrorIcon />
        </div>
      )}
    </a>
  );
};
