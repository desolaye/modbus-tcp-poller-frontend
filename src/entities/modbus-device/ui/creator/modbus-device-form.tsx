import { Tooltip } from "@/shared/ui/tooltip";
import { useModbusForm } from "../../lib/use-modbus-form";

type ModbusDeviceFormProps = {
  onSuccess: () => void;
  deviceId?: number;
};

export const ModbusDeviceForm = (props: ModbusDeviceFormProps) => {
  const { handlers, values } = useModbusForm(props);

  if (values.modbus.isLoading) {
    return <Tooltip noPadding>Загружаем данные об устройстве...</Tooltip>;
  }

  return (
    <form className="form" onReset={handlers.reset} onSubmit={handlers.submit}>
      <Tooltip noPadding>Конфигурация устройства</Tooltip>

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
        <Tooltip isError noPadding>
          Ошибка заполнения формы. Убедитесь, что данные введены правильно
        </Tooltip>
      )}

      {values.mutate.isError && (
        <Tooltip isError noPadding>
          Ошибка отправки формы
          <br />
          Убедитесь, что данные введены правильно или обратитесь к специалисту
        </Tooltip>
      )}

      {values.mutate.isLoading && (
        <Tooltip noPadding>
          {Boolean(values.deviceId) ? "Редактируем" : "Создаём"} устройство...
        </Tooltip>
      )}

      <section style={{ display: "flex", gap: 8 }}>
        <button
          className="button_primary full"
          disabled={values.mutate.isLoading}
        >
          {Boolean(values.deviceId) ? "Редактировать" : "Добавить"}
        </button>
        <button className="button_neutral full" type="reset">
          Отменить
        </button>
      </section>
    </form>
  );
};
