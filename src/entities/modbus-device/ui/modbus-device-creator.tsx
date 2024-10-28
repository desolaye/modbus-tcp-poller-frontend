import { useState } from "react";

export const ModbusDeviceCreator = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: isCreating ? "center" : "end",
        padding: "0 12px",
      }}
    >
      {!isCreating && (
        <button className="button_primary" onClick={() => setIsCreating(true)}>
          + Добавить устройство
        </button>
      )}

      {isCreating && (
        <form className="form" onReset={() => setIsCreating(false)}>
          <p style={{ textAlign: "center" }}>Конфигурация устройства</p>

          <section style={{ display: "flex", gap: 8 }}>
            <input placeholder="ID устройства" className="form_input" />
          </section>

          <input placeholder="IP-адрес" className="form_input" />
          <input placeholder="Порт (по умолч. 502)" className="form_input" />

          <input placeholder="Имя устройства" className="form_input" />
          <input
            placeholder="Порт устройства (по умолч. 60)"
            className="form_input"
          />

          <section style={{ display: "flex", gap: 8 }}>
            <button
              className="button_primary"
              type="reset"
              style={{ width: "100%" }}
            >
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
        </form>
      )}
    </section>
  );
};
