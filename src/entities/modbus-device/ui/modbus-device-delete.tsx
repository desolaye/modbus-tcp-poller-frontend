import { CSSProperties } from "react";

import { useMutate } from "@/shared/lib/use-mutate";
import { deleteModbusDeviceById } from "../services/delete-modbus-device-by-id";

type ModbusDeviceDeleteProps = {
  deviceId?: number;
  onSuccess: () => void;
};

export const ModbusDeviceDelete = (props: ModbusDeviceDeleteProps) => {
  const { deviceId, onSuccess } = props;

  const mutate = useMutate({
    fn: () => deleteModbusDeviceById(deviceId!),
    onSuccess,
  });

  const textStyle = (color?: string): CSSProperties => ({
    fontWeight: 600,
    textAlign: "center",
    color,
  });

  return (
    <article className="form">
      {mutate.isLoading && <p style={textStyle()}>Удаляем...</p>}
      {mutate.isError && <p style={textStyle("#f44336")}>Ошибка удаления</p>}

      {!mutate.isError && !mutate.isLoading && (
        <p style={textStyle()}>
          Вы действительно хотите удалить устройство с ID {deviceId}?
        </p>
      )}

      <section style={{ display: "flex", gap: 8 }}>
        <button
          className="button_primary"
          style={{ width: "100%" }}
          onClick={mutate.mutateAsync}
        >
          Подтвердить
        </button>

        <button
          className="button_neutral"
          style={{ width: "100%" }}
          onClick={onSuccess}
        >
          Отменить
        </button>
      </section>
    </article>
  );
};
