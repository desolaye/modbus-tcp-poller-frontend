import { MouseEvent } from "react";

import { ErrorIcon } from "@/shared/ui/error-icon";
import { QuestionIcon } from "@/shared/ui/question-icon";
import { DeleteIcon } from "@/shared/ui/delete-icon";
import { EditIcon } from "@/shared/ui/edit-icon";

import {
  ModbusDevicePollType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

type ModbusDeviceProps = {
  deviceData: ModbusDeviceType;
  pollData?: ModbusDevicePollType;
  onAction: (device: ModbusDeviceType, isDelete?: boolean) => void;
};

export const ModbusDevice = (props: ModbusDeviceProps) => {
  const { deviceData, pollData, onAction } = props;

  const isError = Boolean(pollData?.isWarning);
  const isPending = !Boolean(pollData);

  const color = isError ? "#eee" : undefined;
  const classes = `grid_row body_row${isError ? " error_row" : ""}${
    isPending ? " pending_row" : ""
  }`;

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    onAction(deviceData, e.currentTarget.name === "delete");
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

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
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
