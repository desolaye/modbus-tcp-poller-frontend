import cn from "classnames";

import { ErrorIcon } from "@/shared/ui/icons/error-icon";
import { QuestionIcon } from "@/shared/ui/icons/question-icon";
import { DeleteIcon } from "@/shared/ui/icons/delete-icon";
import { EditIcon } from "@/shared/ui/icons/edit-icon";
import { CheckIcon } from "@/shared/ui/icons/check-icon";

import {
  ModbusDevicePollType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

type ModbusDeviceProps = {
  deviceData: ModbusDeviceType;
  pollData?: ModbusDevicePollType;
  onAction: (device: ModbusDeviceType, actionType: string) => void;
};

export const ModbusDevice = (props: ModbusDeviceProps) => {
  const { deviceData, pollData, onAction } = props;

  const isConfirmedError = Boolean(deviceData.isConfirmed);
  const isError = Boolean(pollData?.isWarning);
  const isPending = !Boolean(pollData);

  const color = cn({ ["#eee"]: isError || (isError && isConfirmedError) });
  const classes = cn("grid_row body_row", {
    ["error_row"]: isError && !isConfirmedError,
    ["pending_row"]: isPending,
    ["confirm_error_row"]: !isPending && isConfirmedError,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onAction(deviceData, e.currentTarget.name);
  };

  return (
    <a
      className={classes}
      href={"http://" + deviceData.ipAddress}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div style={{ width: 30, height: 30 }}>
        {isPending && <QuestionIcon />}
        {isError && <ErrorIcon />}
      </div>

      <p style={{ color }}>{deviceData.id}</p>
      <p style={{ color }}>{deviceData.ipAddress}</p>
      <p style={{ color }}>{deviceData.port}</p>
      <p style={{ color }}>{deviceData.registerName}</p>
      <p style={{ color }}>{deviceData.registerAddress}</p>

      <div
        style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifySelf: "end",
        }}
      >
        {isError && !isConfirmedError && (
          <button
            name="confirmError"
            className="button_neutral"
            style={{ padding: "2px 4px" }}
            onClick={handleClick}
          >
            <CheckIcon />
          </button>
        )}
        <button
          name="edit"
          className="button_primary"
          style={{ padding: "2px 4px" }}
          onClick={handleClick}
        >
          <EditIcon />
        </button>

        <button
          name="delete"
          className="button_neutral"
          style={{ padding: "2px 4px" }}
          onClick={handleClick}
        >
          <DeleteIcon />
        </button>
      </div>
    </a>
  );
};
