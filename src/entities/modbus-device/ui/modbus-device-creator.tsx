import { useState } from "react";
import { ModbusDeviceType } from "../model/modbus-device.schema";

export const ModbusDeviceCreator = () => {
  const [isCreating, setIsCreating] = useState(false);

  if (!isCreating) return <button>Добавить устройство</button>;

  return (
    <form>
      <input placeholder="" />
    </form>
  );
};
