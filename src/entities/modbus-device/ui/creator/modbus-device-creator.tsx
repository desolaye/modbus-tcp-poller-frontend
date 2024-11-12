import { ModalScreen } from "@/shared/ui/modal-screen";
import { ModbusDeviceForm } from "./modbus-device-form";

type ModbusDeviceCreatorProps = {
  onClick: (id?: number) => void;
  onSuccess: () => void;
  open?: boolean;
  deviceId?: number;
};

export const ModbusDeviceCreator = (props: ModbusDeviceCreatorProps) => {
  const { onClick, onSuccess, deviceId } = props;

  return (
    <>
      <button className="button_secondary full" onClick={() => onClick(0)}>
        +
      </button>

      <ModalScreen
        open={typeof deviceId === "number"}
        onClose={() => onClick()}
      >
        <ModbusDeviceForm onSuccess={onSuccess} deviceId={deviceId} />
      </ModalScreen>
    </>
  );
};
