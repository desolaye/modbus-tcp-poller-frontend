import { CSSProperties } from "react";

import {
  ModbusDevice,
  ModbusDeviceCreator,
  ModbusDeviceDelete,
} from "@/entities/modbus-device";
import { useMainPage } from "../lib/use-main-page";
import { ModalScreen } from "@/shared/ui/modal-screen";
import { ModbusDeviceForm } from "@/entities/modbus-device/ui/modbus-device-form";

export const MainPage = () => {
  const { values, handlers } = useMainPage();

  const tooltopStyles: CSSProperties = {
    padding: "20px 0",
    textAlign: "center",
    fontWeight: 600,
  };

  return (
    <article className="main_page">
      <main style={{ flex: "1" }}>
        {values.isSignalError && (
          <p style={{ ...tooltopStyles, color: "#f44336" }}>
            Ошибка чтения новых сообщений с сервера
            <br />
            Подключаемся заново...
          </p>
        )}

        <section style={{ overflow: "auto", display: "grid" }}>
          <header className="grid_row header_row">
            <div />
            <p className="header_cell">ID устройства</p>
            <p className="header_cell">IP адрес</p>
            <p className="header_cell">Порт</p>
            <p className="header_cell">Имя устройства</p>
            <p className="header_cell">Регистр</p>
            <ModbusDeviceCreator
              onClick={() => handlers.setSelectedDeviceId(0)}
            />
          </header>

          {values.isLoading && (
            <p style={{ ...tooltopStyles }}>Список устройств загружается...</p>
          )}

          {values.isError && (
            <p style={{ ...tooltopStyles, color: "#f44336" }}>
              Ошибка загрузки списка устройств
            </p>
          )}

          {!values.isError &&
            !values.isLoading &&
            !Boolean(values.data?.length) && (
              <p style={{ ...tooltopStyles }}>
                Список устройств пустой. Добавьте первое устройство
              </p>
            )}

          <main>
            {values.data?.map((device) => (
              <ModbusDevice
                key={device.id}
                deviceData={device}
                pollData={handlers.selectPollData(device)}
                onAction={handlers.onAction}
              />
            ))}
          </main>
        </section>
      </main>

      <ModalScreen
        open={typeof values.selectedDeviceId === "number"}
        onClose={() => handlers.setSelectedDeviceId(undefined)}
      >
        <ModbusDeviceForm
          onSuccess={handlers.onSuccessMutate}
          deviceId={values.selectedDeviceId}
        />
      </ModalScreen>

      <ModalScreen
        open={typeof values.deletingDeviceId === "number"}
        onClose={() => handlers.setDeletingDeviceId(undefined)}
      >
        <ModbusDeviceDelete
          onSuccess={handlers.onSuccessMutate}
          deviceId={values.deletingDeviceId}
        />
      </ModalScreen>
    </article>
  );
};
