import { useModbusCreator } from "../lib/use-modbus-creator";
import {
  ModbusDeviceFormType,
  ModbusDeviceType,
} from "../model/modbus-device.schema";

type ModbusDeviceCreatorProps = {
  isMutateError: boolean;
  isMutateLoading: boolean;
  onMutate: (device: ModbusDeviceType) => void;
};

export const ModbusDeviceCreator = (props: ModbusDeviceCreatorProps) => {
  const { isMutateError, isMutateLoading, onMutate } = props;
  const { handlers, values } = useModbusCreator({ onMutate });

  const inputs: { name: keyof ModbusDeviceFormType; placeholder: string }[] = [
    { name: "id", placeholder: "ID устройства" },
    { name: "ipAddress", placeholder: "IP-адрес" },
    { name: "port", placeholder: "Порт (по умолч. 502)" },
    { name: "registerName", placeholder: "Имя устройства" },
    { name: "registerAddress", placeholder: "Порт устройства (по умолч. 60)" },
  ];

  return (
    <section
      style={{
        display: "flex",
        justifyContent: values.isCreating ? "center" : "end",
        padding: "0 12px",
      }}
    >
      {!values.isCreating && (
        <button
          className="button_primary"
          onClick={() => handlers.setIsCreating(true)}
        >
          + Добавить устройство
        </button>
      )}

      {values.isCreating && (
        <form
          className="form"
          onReset={handlers.reset}
          onSubmit={handlers.submit}
        >
          <p style={{ textAlign: "center" }}>Конфигурация нового устройства</p>

          {inputs.map((v) => (
            <input
              key={v.name}
              name={v.name}
              placeholder={v.placeholder}
              value={values.device[v.name]}
              onChange={handlers.change}
              className="form_input"
              autoComplete="off"
            />
          ))}

          {values.isFormError && (
            <p style={{ fontWeight: 600, color: "#f44336" }}>
              Ошибка заполнения формы. Убедитесь, что данные введены правильно
            </p>
          )}

          {isMutateError && (
            <p style={{ fontWeight: 600, color: "#f44336" }}>
              Ошибка отправки формы
              <br />
              Убедитесь, что данные введены правильно или обратитесь к
              специалисту
            </p>
          )}

          <section style={{ display: "flex", gap: 8 }}>
            <button className="button_primary" style={{ width: "100%" }}>
              Добавить
            </button>
            <button
              className="button_neutral"
              type="reset"
              style={{ width: "100%" }}
            >
              Отменить
            </button>
          </section>

          {isMutateLoading && (
            <p style={{ fontWeight: 600 }}>Создаём новое устройство...</p>
          )}
        </form>
      )}
    </section>
  );
};
