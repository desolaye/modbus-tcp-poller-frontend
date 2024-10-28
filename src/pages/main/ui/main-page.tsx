import { CSSProperties } from "react";

import { ModbusDevice, ModbusDeviceCreator } from "@/entities/modbus-device";
import { useMainPage } from "../lib/use-main-page";

export const MainPage = () => {
  const { values, handlers } = useMainPage();

  const tooltopStyles: CSSProperties = {
    padding: "20px 0",
    textAlign: "center",
    fontWeight: 600,
  };

  const subStyles: CSSProperties = {
    padding: 8,
    backgroundColor: "#164157",
    textAlign: "center",
  };

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: "100vh",
        backgroundColor: "#eee",
      }}
    >
      <header style={subStyles}>
        <h1 style={{ fontWeight: 600, color: "#eee" }}>
          Проверка состояния устройств
        </h1>
      </header>

      <main style={{ flex: "1" }}>
        {values.isSignalError && (
          <p style={{ ...tooltopStyles, color: "#f44336" }}>
            Ошибка чтения новых сообщений с сервера. Перезагрузите страницу или
            обратитесь к специалисту
          </p>
        )}

        {values.isError && (
          <p style={{ ...tooltopStyles, color: "#f44336" }}>
            Ошибка загрузки списка устройств
          </p>
        )}

        <ModbusDeviceCreator />

        <section style={{ overflow: "auto", padding: "8px 0" }}>
          <header className="grid_row header_row">
            <p className="header_cell">ID устройства</p>
            <p className="header_cell">IP адрес</p>
            <p className="header_cell">Порт</p>
            <p className="header_cell">Имя устройства</p>
            <p className="header_cell">Порт устройства</p>
            <div />
          </header>

          {values.isLoading && (
            <p style={{ ...tooltopStyles }}>Список устройств загружается...</p>
          )}

          <main>
            {values.data?.map((device) => (
              <ModbusDevice
                key={device.id}
                deviceData={device}
                pollData={handlers.selectPollData(device)}
              />
            ))}
          </main>
        </section>
      </main>

      <footer style={{ ...subStyles }}>
        <p
          style={{
            color: "#eee",
            padding: "6px 0",
          }}
        >
          Сделано компанией{" "}
          <a
            href="https://vorpostnsk.ru/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600,
              color: "#eee",
              padding: "6px 10px",

              backgroundColor: "#005389",
              borderRadius: 8,
            }}
          >
            ФОРПОСТ
          </a>{" "}
        </p>
      </footer>
    </article>
  );
};
