import { useMutate } from "@/shared/lib/use-mutate";
import { Tooltip } from "@/shared/ui/tooltip";

import { ModbusDeviceType } from "../model/modbus-device.schema";
import { deleteModbusDeviceById } from "../services/delete-modbus-device-by-id";

type ModbusDeviceDeleteProps = {
  device: ModbusDeviceType;
  onSuccess: (ipAddress?: string) => void;
};

export const ModbusDeviceDelete = (props: ModbusDeviceDeleteProps) => {
  const { device, onSuccess } = props;

  const { isError, isLoading, mutateAsync } = useMutate({
    fn: () => deleteModbusDeviceById(device?.id!),
    onSuccess: () => onSuccess(device.ipAddress),
  });

  return (
    <article className="form">
      <Tooltip noPadding>
        Вы действительно хотите удалить устройство?
        <br />
        <br />
        {device.ipAddress}:{device.port} - {device.registerName}
      </Tooltip>

      {isLoading && <Tooltip noPadding>Удаляем...</Tooltip>}
      {isError && (
        <Tooltip noPadding isError>
          Ошибка удаления
        </Tooltip>
      )}

      <section style={{ display: "flex", gap: 8 }}>
        <button
          className="button_primary full"
          onClick={mutateAsync}
          disabled={isLoading}
        >
          Подтвердить
        </button>

        <button className="button_neutral full" onClick={() => onSuccess()}>
          Отменить
        </button>
      </section>
    </article>
  );
};
