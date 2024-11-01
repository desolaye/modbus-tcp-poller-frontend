import { CSSProperties } from "react";
import { useModbusForm } from "../lib/use-modbus-form";

type ModbusDeviceFormProps = {
  onSuccess: () => void;
  deviceId?: number;
};

export const ModbusDeviceForm = (props: ModbusDeviceFormProps) => {
  const { handlers, values } = useModbusForm(props);

  const textStyle = (color?: string): CSSProperties => ({
    fontWeight: 600,
    textAlign: "center",
    color,
  });

  if (values.modbus.isLoading) {
    return <p style={textStyle()}>Загружаем данные об устройстве...</p>;
  }

  return (
    <form className="form" onReset={handlers.reset} onSubmit={handlers.submit}>
      <p style={textStyle()}>Конфигурация устройства</p>

      {values.inputs.map((v) => (
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
        <p style={textStyle("#f44336")}>
          Ошибка заполнения формы. Убедитесь, что данные введены правильно
        </p>
      )}

      {values.mutate.isError && (
        <p style={textStyle("#f44336")}>
          Ошибка отправки формы
          <br />
          Убедитесь, что данные введены правильно или обратитесь к специалисту
        </p>
      )}

      <section style={{ display: "flex", gap: 8 }}>
        <button className="button_primary" style={{ width: "100%" }}>
          {Boolean(values.deviceId) ? "Редактировать" : "Добавить"}
        </button>
        <button
          className="button_neutral"
          type="reset"
          style={{ width: "100%" }}
        >
          Отменить
        </button>
      </section>

      {values.mutate.isLoading && (
        <p style={textStyle()}>
          {Boolean(values.deviceId) ? "Редактируем" : "Создаём"} устройство...
        </p>
      )}
    </form>
  );
};
